import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {StoreService} from "../../../services/store/store.service";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {ISearchDetailsOfRecipes} from "../../../interfaces/pages/ISearchDetailsOfRecipes";
import {IPageInfo} from "../../../interfaces/pages/IPageInfo";
import {FormControl, FormGroup} from "@angular/forms";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {INutrient} from "../../../interfaces/entities/nutrient/INutrient";
import {Router} from "@angular/router";
import {RecipeCategoryService} from "../../../services/fetches/recipes/recipe-category.service";
import {IngredientService} from "../../../services/fetches/ingredients/ingredient.service";
import {NutrientService} from "../../../services/fetches/nutrients/nutrient.service";

@Component({
  selector: 'app-created-recipes',
  templateUrl: './created-recipes.component.html',
  styleUrls: ['./created-recipes.component.css']
})
export class CreatedRecipesComponent implements OnInit {

  recipesCreated: IRecipe[];
  @Input()
  user:IUser

  searchDetailsOfCreated: ISearchDetailsOfRecipes;
  pageInfoOfCreated: IPageInfo;

  searchForm: FormGroup;
  categories: IRecipeCategory[];
  ingredients: IIngredient[];
  nutrients: INutrient[];

  meme1 = null;
  meme2 = null;
  meme3 = null;

  constructor(private router: Router,
              private storeService: StoreService,
              private recipeCategoryService: RecipeCategoryService,
              private ingredientService: IngredientService,
              private nutrientService: NutrientService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.storeService.createdRecipes.subscribe(value => this.recipesCreated = value);
    this.ingredientService.getAll().subscribe(value => this.ingredients = value);
    this.nutrientService.getAll().subscribe(value => this.nutrients = value);
    this.storeService.pageInfoOfCreated.subscribe(value => this.pageInfoOfCreated = value);
    this.recipeCategoryService.getAll().subscribe(value => this.categories = value);
  }

  private createForm() {
    this.searchForm = new FormGroup({
      title: new FormControl(undefined),
      recipeCategoryId: new FormControl(0),
      nutrientId: new FormControl(0),
      pageSize: new FormControl(10)
    })
  }

  submitFilter(): void {
    this.storeService.searchDetailsOfCreated.next({
      recipeCategoryId: 0,
      nutrientId: 0,
      title: undefined,
      pageSize: 10
    });
    this.searchDetailsOfCreated = {
      recipeCategoryId: 0,
      nutrientId: 0,
      title: undefined,
      pageSize: 10
    };

    this.searchDetailsOfCreated = this.searchForm.getRawValue();
    this.storeService.searchDetailsOfCreated.next(this.searchForm.getRawValue())

    this.storeService.pageInfoOfCreated.next({
      currentPage: 0,
      totalPages: 0,
      totalElements: 0
    });
    this.pageInfoOfCreated = {
      currentPage: 0,
      totalPages: 0,
      totalElements: 0
    }
    if (
      !(!this.searchDetailsOfCreated.nutrientId &&
        !this.searchDetailsOfCreated.recipeCategoryId &&
        !this.searchDetailsOfCreated.title &&
        !this.searchDetailsOfCreated.pageSize )
    ) {
      this.router.navigate(['cabinet/created-recipes', this.pageInfoOfCreated.currentPage], {
        queryParams: {
          categoryId: this.searchDetailsOfCreated.recipeCategoryId,
          title: this.searchDetailsOfCreated.title,
          nutrientId: this.searchDetailsOfCreated.nutrientId,
          pageSize: this.searchDetailsOfCreated.pageSize,
          userId: this.user.id
        }
      })
    }
  }

//======================================

  goFirstPage() {
    if (this.pageInfoOfCreated.currentPage != 0) {
      this.updatePageInfo(0, this.pageInfoOfCreated.totalPages, this.pageInfoOfCreated.totalElements);
      this.paginateFilter();
    }
  }

  goPreviousPage() {
    if (this.pageInfoOfCreated.currentPage > 0) {
      this.updatePageInfo(this.pageInfoOfCreated.currentPage - 1, this.pageInfoOfCreated.totalPages, this.pageInfoOfCreated.totalElements);
      this.paginateFilter();
    }
  }

  goNextPage() {
    if (this.pageInfoOfCreated.currentPage < this.pageInfoOfCreated.totalPages - 1) {
      this.updatePageInfo(this.pageInfoOfCreated.currentPage + 1, this.pageInfoOfCreated.totalPages, this.pageInfoOfCreated.totalElements);
      this.paginateFilter();
    }
  }

  goLastPage() {
    if (this.pageInfoOfCreated.currentPage != this.pageInfoOfCreated.totalPages - 1) {
      this.updatePageInfo(this.pageInfoOfCreated.totalPages - 1, this.pageInfoOfCreated.totalPages, this.pageInfoOfCreated.totalElements);
      this.paginateFilter();
    }
  }

//======================================================================

  paginateFilter() {
    this.storeService.searchDetailsOfFavorite.subscribe(value => {
      this.searchDetailsOfCreated = value;
      this.navigate();
    })
  }

  updatePageInfo(currentPage: number, totalPages: number, totalRecipes: number): void {
    this.storeService.pageInfoOfFavorite.next({
      currentPage: currentPage,
      totalPages: totalPages,
      totalElements: totalRecipes
    });
  }

  navigate() {
    this.router.navigate(['cabinet/favorite-recipes', this.pageInfoOfCreated.currentPage], {
      queryParams: {
        categoryId: this.searchDetailsOfCreated.recipeCategoryId,
        title: this.searchDetailsOfCreated.title,
        nutrientId: this.searchDetailsOfCreated.nutrientId,
        pageSize: this.searchDetailsOfCreated.pageSize,
        userId: this.user.id
      }
    })
  }
}
