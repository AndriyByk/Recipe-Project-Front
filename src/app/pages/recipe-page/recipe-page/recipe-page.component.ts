import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {ActivatedRoute, Router} from "@angular/router";
// import {baseURL, recipeUrl} from "../../../urls/urls";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {INorm} from "../../../interfaces/entities/user/INorm";
import {INutrientDto} from "../../../interfaces/entities/nutrient/INutrientDto";
import {IProportion} from "../../../interfaces/entities/nutrient/IProportion";
import {FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../../../services/fetches/recipes/recipe.service";
import {StoreService} from "../../../services/store/store.service";
import {UserService} from "../../../services/fetches/users/user.service";
import {CommentService} from "../../../services/fetches/comments/comment.service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  // url: string;
  fullImagePath: string;

  urlToProfile: string = '/user';
  private actualUser = 'actualUser';
  form: FormGroup;
  commentForm: FormGroup;

  recipe: IRecipe;
  stages: string[];
  user: IUser;
  username: string | null;

  norms: INorm[];
  quantities: INutrientDto[];
  proportions: IProportion = {
    energy: [],
    minerals: [],
    vitamins: [],
    organics: []
  };

  userVerified: boolean = false;
  adminMode: boolean = false;

  rate: number;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private storeService: StoreService,
              private userService: UserService,
              private commentService: CommentService) {
    this.createForm();
    this.createCommentForm();
  }

  createCommentForm(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl(null)
    })
  }

  createForm(): void {
    this.form = new FormGroup({
      rate: new FormControl(null)
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('admin-mode') != null) {
      this.adminMode = true;
    }

    // this.url = baseURL + recipeUrl.pictures;
    this.fullImagePath = '/assets/pictures/recipe.jpg';

    this.username = localStorage.getItem(this.actualUser);

    if (this.username ) {
      this.userVerified = true;
      this.activatedRoute.data.subscribe(({user, recipe}) => {
        this.recipe = recipe;
        this.stages = recipe.description.split(".");

        this.user = user;
        this.getRateOfRecipe(this.user.id, this.recipe.id);

        if (user.userNorms.length > 0) {
          this.fillWithUserInfo(recipe, user);
        } else {
          this.fillWithoutUser(recipe);
        }
      })
    } else {
      this.activatedRoute.data.subscribe(({recipe}) => {
        this.recipe = recipe;
        this.stages = recipe.description.split(".");

        this.fillWithoutUser(recipe);
      })
    }
  }

  private fillWithoutUser(recipe: IRecipe) {
    for (let j = 0; j < recipe.quantities.length; j++) {
      if (j == 0) {
        this.proportions.energy.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        });
      } else if (j >= 1 && j < 9) {
        this.proportions.organics.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        });
      } else if (j >= 9 && j < 22) {
        this.proportions.vitamins.push({
          idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantities[j].nutrientDto.name,
          category: recipe.quantities[j].nutrientDto.categoryDto.name,
          nutrientQuantity: recipe.quantities[j].nutrientDto.quantity,
          unit: recipe.quantities[j].nutrientDto.unit
        });
      } else if (j >= 22) {
        this.proportions.minerals.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        });
      }
    }
  }

  private fillWithUserInfo(recipe: IRecipe, user: IUser) {
    for (let j = 0, i = 0; j < recipe.quantitiesPer100.length; j++) {
      if (j == 0) {
        this.proportions.energy.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          percentage: Math.ceil(Math.ceil(recipe.quantitiesPer100[j].nutrientDto.quantity / user.userNorms[i].quantity * 1000) / 10),
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          userNorm: user.userNorms[i].quantity,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        });
        // лічильник "і" змінюється лише для тих нутрієнтів, де є норми
        // є медіумом між масивом норм і
        i++;
      } else if (j == 1 || j == 2 || j == 6) {
        this.proportions.organics.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          percentage: Math.ceil(Math.ceil(recipe.quantitiesPer100[j].nutrientDto.quantity / user.userNorms[i].quantity * 1000) / 10),
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          userNorm: user.userNorms[i].quantity,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        });
        i++;
      } else if ((j > 2 && j < 6) || (j > 6 && j < 9)) {
        this.proportions.organics.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        });
      } else if ((j >= 9 && j < 13) || j > 13 && j < 22) {
        this.proportions.vitamins.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          percentage: Math.ceil(Math.ceil(recipe.quantities[j].nutrientDto.quantity / user.userNorms[i].quantity * 1000) / 10),
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          userNorm: user.userNorms[i].quantity,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        })
        i++;
      } else if (j == 13) {
        this.proportions.vitamins.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        })
      } else if (j >= 22 && j < 25) {
        this.proportions.minerals.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        })
      } else if (j > 24) {
        this.proportions.minerals.push({
          idOfNutrient: recipe.quantitiesPer100[j].nutrientDto.idOfNutrient,
          nutrient: recipe.quantitiesPer100[j].nutrientDto.name,
          percentage: Math.ceil(Math.ceil(recipe.quantities[j].nutrientDto.quantity / user.userNorms[i].quantity * 1000) / 10),
          category: recipe.quantitiesPer100[j].nutrientDto.categoryDto.name,
          userNorm: user.userNorms[i].quantity,
          nutrientQuantity: recipe.quantitiesPer100[j].nutrientDto.quantity,
          unit: recipe.quantitiesPer100[j].nutrientDto.unit
        })
        i++;
      }
    }
  }

  vote() {
    let {rate} = this.form.getRawValue();
    if (rate) {
      let recipeId = this.recipe.id;
      let userId = this.user.id;
      let rateObject = {
        recipeId: recipeId,
        userId: userId,
        rate: rate
      }
      this.recipeService.rateRecipe(JSON.stringify(rateObject)).subscribe(value => this.recipe = value)
    }
  }

  getRecipesByCategoryId(id: number) {
    this.storeService.searchDetails.next({
      recipeCategoryId: id
    })
    if (this.adminMode) {
      this.router.navigate(['recipes/find-and-sort/admin-mode', 0], {
        queryParams: {
          categoryId: id,
          pageSize: 10
        }
      })
    } else {
      this.router.navigate(['recipes/find-and-sort', 0], {
        queryParams: {
          categoryId: id,
          pageSize: 10
        }
      })
    }
  }

  saveOrDeleteFavorite(): boolean {
    return this.user.favoriteRecipes.findIndex(value => value == this.recipe.id) >= 0;
  }

  saveToFavorites() {
    if (this.username != null) {
      this.userService.updateFavoriteRecipes(this.username, this.recipe.id.toString()).subscribe(value => this.user = value);
    }
  }

  private getRateOfRecipe(userId: number, recipeId: number) {
    return this.userService.getRateById(userId, recipeId).subscribe(value => this.rate = value);
  }

  showRateOfRecipe(value: number) {
    this.rate = value;
  }

  postComment(): void {
    let data = this.commentForm.getRawValue();
    if (data.comment != '' && data.comment != null) {
      const fullDate = this.createDate();
      let formData = new FormData();
      formData.append('comment', JSON.stringify({
        date: fullDate,
        comment: data.comment
      }));
      this.commentService.save(data, this.user.id, this.recipe.id, fullDate).subscribe(value => this.recipe = value)
      this.commentForm.reset();
    }
  }

  createDate(): string {
    let date1 = new Date();
    const date: string = [
      date1.getDate().toString().padStart(2, '0'),
      (date1.getMonth() + 1).toString().padStart(2, '0'),
      date1.getFullYear()
    ].join('-');
    // час
    const time: string = [
      date1.getHours().toString().padStart(2, '0'),
      date1.getMinutes().toString().padStart(2, '0'),
      date1.getSeconds().toString().padStart(2, '0')
    ].join('-');
    return [date, time].join('_');
  }

  showCheckingNav() {
    let status = document.getElementsByClassName('recipe-page-status-check-uncheck')[0];
    status.classList.toggle('show-hide-status');
  }

  changeStatus(recipeId: number) {
    this.recipeService.changeStatus(recipeId).subscribe(value => this.recipe = value);
  }

  navigateToProfile(authorId: number) {
    if (authorId == this.user.id) {
      this.router.navigate(['/cabinet/info'])
    } else {
      this.router.navigate([this.urlToProfile, authorId], {
        queryParams: {
          pageSize: 10,
          userId: authorId,
          pageNumber: 0
        }
      })
    }
  }

  deleteComment(commentId: number, authorId: number, recipeId: number) {
    if (this.user.id == authorId || this.adminMode) {
      this.commentService.delete(commentId, recipeId).subscribe(value => this.recipe = value)
    }
  }

  deleteRecipe(id: number) {
    this.recipeService.delete(id).subscribe(() => {
      this.storeService.searchDetails.next({});
      this.storeService.pageSize.next(10);

      this.router.navigate(['recipes/all-recipes/admin-mode', 0], {
        queryParams: {
          pageSize: 10
        }
      });
    });
  }
}
