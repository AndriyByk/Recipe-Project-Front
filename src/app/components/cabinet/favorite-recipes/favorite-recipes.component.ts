import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {FormControl, FormGroup} from "@angular/forms";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {INutrient} from "../../../interfaces/entities/nutrient/INutrient";
import {StoreService} from "../../../services/store/store.service";
import {RecipeCategoryService} from "../../../services/fetches/recipes/recipe-category.service";
import {IngredientService} from "../../../services/fetches/ingredients/ingredient.service";
import {NutrientService} from "../../../services/fetches/nutrients/nutrient.service";
import {IPageInfo} from "../../../interfaces/pages/IPageInfo";
import {ISearchDetailsOfRecipes} from "../../../interfaces/pages/ISearchDetailsOfRecipes";
import {Router} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.css']
})
export class FavoriteRecipesComponent implements OnInit {
  @Input()
  recipesFavorite: IRecipe[];
  @Input()
  user: IUser;

  searchDetailsOfFavorite: ISearchDetailsOfRecipes;
  pageInfoOfFavorite: IPageInfo;
  pageSizeOfFavorite: number = 10;

  searchForm: FormGroup;
  categories: IRecipeCategory[];
  ingredients: IIngredient[];
  nutrients: INutrient[];

  meme1 = null;
  meme2 = null;

  constructor(private router: Router,
              private storeService: StoreService,
              private recipeCategoryService: RecipeCategoryService,
              private ingredientService: IngredientService,
              private nutrientService: NutrientService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.recipeCategoryService.getAll().subscribe(value => this.categories = value);
    this.ingredientService.getAll().subscribe(value => this.ingredients = value);
    this.nutrientService.getAll().subscribe(value => this.nutrients = value);
    this.storeService.pageInfoOfFavorite.subscribe(value => this.pageInfoOfFavorite = value);
  }

  private createForm() {
    this.searchForm = new FormGroup({
      title: new FormControl(null),
      recipeCategoryId: new FormControl(null),
      nutrientId: new FormControl(null)
    })
  }

  submitFilter(): void {
    this.storeService.searchDetailsOfFavorite.next({})

    this.searchDetailsOfFavorite = this.searchForm.getRawValue();
    this.storeService.searchDetailsOfFavorite.next(this.searchForm.getRawValue())
    console.log(this.searchForm.getRawValue());

    this.storeService.pageInfoOfFavorite.next({
      currentPage: 0,
      totalPages: this.pageInfoOfFavorite.totalPages,
      totalElements: this.pageInfoOfFavorite.totalElements
    });

    if (
      this.searchDetailsOfFavorite.nutrientId ||
      this.searchDetailsOfFavorite.recipeCategoryId ||
      this.searchDetailsOfFavorite.title ||
      this.searchDetailsOfFavorite.recipeCategoryId && this.searchDetailsOfFavorite.title ||
      this.searchDetailsOfFavorite.recipeCategoryId && this.searchDetailsOfFavorite.nutrientId ||
      this.searchDetailsOfFavorite.title && this.searchDetailsOfFavorite.nutrientId ||
      this.searchDetailsOfFavorite.recipeCategoryId && this.searchDetailsOfFavorite.title && this.searchDetailsOfFavorite.nutrientId
    ) {
      this.router.navigate(['cabinet/favorite-recipes', this.pageInfoOfFavorite.currentPage], {
        queryParams: {
          categoryId: this.searchDetailsOfFavorite.recipeCategoryId,
          title: this.searchDetailsOfFavorite.title,
          nutrientId: this.searchDetailsOfFavorite.nutrientId,
          pageSize: this.pageSizeOfFavorite,
          userId: this.user.id
        }
      })
    }
  }
  //========================================
  goFirstPage() {
    if (this.pageInfoOfFavorite.currentPage != 0) {
      this.updatePageInfo(0, this.pageInfoOfFavorite.totalPages, this.pageInfoOfFavorite.totalElements);
      this.paginateFilter();
    }
  }

  goPreviousPage() {
    if (this.pageInfoOfFavorite.currentPage > 0) {
      this.updatePageInfo(this.pageInfoOfFavorite.currentPage - 1, this.pageInfoOfFavorite.totalPages, this.pageInfoOfFavorite.totalElements);
      this.paginateFilter();
    }
  }

  goNextPage() {
    if (this.pageInfoOfFavorite.currentPage < this.pageInfoOfFavorite.totalPages - 1) {
      this.updatePageInfo(this.pageInfoOfFavorite.currentPage + 1, this.pageInfoOfFavorite.totalPages, this.pageInfoOfFavorite.totalElements);
      this.paginateFilter();
    }
  }

  goLastPage() {
    if (this.pageInfoOfFavorite.currentPage != this.pageInfoOfFavorite.totalPages - 1) {
      this.updatePageInfo(this.pageInfoOfFavorite.totalPages - 1, this.pageInfoOfFavorite.totalPages, this.pageInfoOfFavorite.totalElements);
      this.paginateFilter();
    }
  }

//======================================================================

  paginateFilter() {
    this.storeService.searchDetailsOfFavorite.subscribe(value => {
      this.searchDetailsOfFavorite = value;
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
    this.router.navigate(['cabinet/favorite-recipes', this.pageInfoOfFavorite.currentPage], {
      queryParams: {
        categoryId: this.searchDetailsOfFavorite.recipeCategoryId,
        title: this.searchDetailsOfFavorite.title,
        nutrientId: this.searchDetailsOfFavorite.nutrientId,
        pageSize: this.pageSizeOfFavorite,
        userId: this.user.id
      }
    })
  }
}
