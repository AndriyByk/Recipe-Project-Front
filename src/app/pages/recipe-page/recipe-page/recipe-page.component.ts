import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {ActivatedRoute, Router} from "@angular/router";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {INorm} from "../../../interfaces/entities/user/INorm";
import {INutrientDto} from "../../../interfaces/entities/nutrient/INutrientDto";
import {IProportion} from "../../../interfaces/entities/nutrient/IProportion";
import {FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../../../services/fetches/recipes/recipe.service";
import {StoreService} from "../../../services/store/store.service";
import {UserService} from "../../../services/fetches/users/user.service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  url: string;
  private actualUser = 'actualUser';
  form: FormGroup;

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

  rate: number;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private storeService: StoreService,
              private userService: UserService) {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      rate: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.url = baseURL + recipeUrl.pictures;
    this.username = localStorage.getItem(this.actualUser);

    if (this.username) {
      this.activatedRoute.data.subscribe(({user, recipe}) => {
        this.recipe = recipe;
        this.stages = recipe.description.split(".");
        this.user = user;
        this.getRateOfRecipe(this.user.id, this.recipe.id);
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
      })
    } else {
      this.activatedRoute.data.subscribe(({recipe}) => {
        this.recipe = recipe;
        this.stages = recipe.description.split(".");

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
      })
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
      let formData = new FormData();
      formData.append('rate', JSON.stringify(rateObject))
      this.recipeService.rateRecipe(JSON.stringify(rateObject)).subscribe(value => this.recipe = value)
    }
  }

  getRecipesByCategoryId(id: number) {
    this.storeService.searchDetails.next({
      recipeCategoryId: id
    })

    this.router.navigate(['recipes/find', 0], {
      queryParams: {
        categoryId: id,
        pageSize: 10
      }
    })
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
}
