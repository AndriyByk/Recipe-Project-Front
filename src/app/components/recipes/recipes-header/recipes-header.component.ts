import { Component, OnInit } from '@angular/core';
import {ISearchDetails} from "../../../interfaces/pages/ISearchDetails";
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
  searchDetails: ISearchDetails;
  pageInfo: IPageInfo;
  pageSize: number = 10;

  form: FormGroup;
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
    this.storeService.pageInfo.subscribe(value => this.pageInfo = value)
  }

  private createForm() {
    this.form = new FormGroup({
      title: new FormControl(null),
      recipeCategoryId: new FormControl(null),
      nutrientId: new FormControl(null)
    })
  }

  submitFilter(): void {
    this.storeService.searchDetails.next({});
    this.searchDetails = this.form.getRawValue();
    this.storeService.searchDetails.next(this.form.getRawValue());

    this.storeService.pageInfo.next({
      currentPage: 0,
      totalPages: this.pageInfo.totalPages,
      totalRecipes: this.pageInfo.totalRecipes
    });
    if (
      this.searchDetails.nutrientId ||
      this.searchDetails.recipeCategoryId ||
      this.searchDetails.title ||
      this.searchDetails.recipeCategoryId && this.searchDetails.title ||
      this.searchDetails.recipeCategoryId && this.searchDetails.nutrientId ||
      this.searchDetails.title && this.searchDetails.nutrientId ||
      this.searchDetails.recipeCategoryId && this.searchDetails.title && this.searchDetails.nutrientId
    ) {
      this.router.navigate(['recipes/find-and-sort', this.pageInfo.currentPage], {
        queryParams: {
          categoryId: this.searchDetails.recipeCategoryId,
          title: this.searchDetails.title,
          nutrientId: this.searchDetails.nutrientId,
          pageSize: this.pageSize
        }
      })
    }
  }
}
