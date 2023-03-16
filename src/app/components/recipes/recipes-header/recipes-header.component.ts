import { Component, OnInit } from '@angular/core';
import {ISearchDetailsOfRecipes} from "../../../interfaces/pages/ISearchDetailsOfRecipes";
import {IPageInfo} from "../../../interfaces/pages/IPageInfo";
import {FormControl, FormGroup} from "@angular/forms";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {INutrient} from "../../../interfaces/entities/nutrient/INutrient";
import {StoreService} from "../../../services/store/store.service";
import {RecipeCategoryService} from "../../../services/fetches/recipes/recipe-category.service";
import {IngredientService} from "../../../services/fetches/ingredients/ingredient.service";
import {NutrientService} from "../../../services/fetches/nutrients/nutrient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipes-header',
  templateUrl: './recipes-header.component.html',
  styleUrls: ['./recipes-header.component.css']
})
export class RecipesHeaderComponent implements OnInit {
  searchDetails: ISearchDetailsOfRecipes;
  pageInfo: IPageInfo;
  // pageSize: number = 10;

  form: FormGroup;
  categories: IRecipeCategory[];
  ingredients: IIngredient[];
  nutrients: INutrient[];

  private adminMode = 'admin-mode';
  url_redirect: string = 'recipes/find-and-sort';

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
    this.recipeCategoryService.getAll().subscribe(value => this.categories = value);
    this.ingredientService.getAll().subscribe(value => this.ingredients = value);
    this.nutrientService.getAll().subscribe(value => this.nutrients = value);
    this.storeService.pageInfo.subscribe(value => this.pageInfo = value)
  }

  private createForm() {
    this.form = new FormGroup({
      title: new FormControl(undefined),
      recipeCategoryId: new FormControl(0),
      nutrientId: new FormControl(0),
      pageSize: new FormControl(10)
    })
  }

  submitFilter(): void {
    this.storeService.searchDetails.next({
      recipeCategoryId: 0,
      nutrientId: 0,
      title: undefined,
      pageSize: 10
    });
    this.storeService.searchDetails.subscribe(value => this.searchDetails = value);

    console.log(this.form.getRawValue());

    this.storeService.searchDetails.next(this.form.getRawValue());
    this.storeService.searchDetails.subscribe(value => this.searchDetails = value);

    // this.searchDetails = this.form.getRawValue();

    this.storeService.pageInfo.next({
      currentPage: 0,
      totalPages: 0,
      totalElements: 0
    });
    this.pageInfo = {
      currentPage: 0,
      totalPages: 0,
      totalElements: 0
    };

    // if (
    //   this.searchDetails.nutrientId ||
    //   this.searchDetails.recipeCategoryId ||
    //   this.searchDetails.title ||
    //   this.searchDetails.pageSize ||
    //
    //   this.searchDetails.recipeCategoryId && this.searchDetails.title ||
    //   this.searchDetails.recipeCategoryId && this.searchDetails.nutrientId ||
    //   this.searchDetails.recipeCategoryId && this.searchDetails.pageSize ||
    //   this.searchDetails.title && this.searchDetails.nutrientId ||
    //   this.searchDetails.title && this.searchDetails.pageSize ||
    //   this.searchDetails.nutrientId && this.searchDetails.pageSize ||
    //
    //   this.searchDetails.recipeCategoryId && this.searchDetails.title && this.searchDetails.pageSize ||
    //   this.searchDetails.recipeCategoryId && this.searchDetails.title && this.searchDetails.nutrientId ||
    //   this.searchDetails.recipeCategoryId && this.searchDetails.pageSize && this.searchDetails.nutrientId ||
    //
    //   this.searchDetails.title && this.searchDetails.pageSize && this.searchDetails.nutrientId
    //
    //
    // ) {
    if (
      !(!this.searchDetails.nutrientId &&
      !this.searchDetails.recipeCategoryId &&
      !this.searchDetails.title &&
      !this.searchDetails.pageSize)
    ) {
      if (localStorage.getItem(this.adminMode)) {
        this.url_redirect = 'recipes/find-and-sort/admin-mode';
      }
      this.router.navigate([this.url_redirect, this.pageInfo.currentPage], {
        queryParams: {
          categoryId: this.searchDetails.recipeCategoryId,
          title: this.searchDetails.title,
          nutrientId: this.searchDetails.nutrientId,
          pageSize: this.searchDetails.pageSize
        }
      })
    }
    // для пошуку всіх (нефільтрованих) рецептів - слід скористатись головною кнопкою-логотипом
    // else if ((this.searchDetails.recipeCategoryId == 0) && (this.searchDetails.nutrientId == 0) ||
    //   this.searchDetails.recipeCategoryId == 0 || this.searchDetails.nutrientId == 0) {
    //   this.router.navigate(['recipes/allRecipes', 0])
    // }
  }
}
