import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../../services/store/store.service";
import {RecipeCategoryService} from "../../../services/fetches/recipes/recipe-category.service";
import {IngredientService} from "../../../services/fetches/ingredients/ingredient.service";
import {RecipeService} from "../../../services/fetches/recipes/recipe.service";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {FormControl, FormGroup} from "@angular/forms";
import {INutrient} from "../../../interfaces/entities/nutrient/INutrient";
import {NutrientService} from "../../../services/fetches/nutrients/nutrient.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // recipes: IRecipe[];
  categories: IRecipeCategory[];
  ingredients: IIngredient[];
  form: FormGroup;
  nutrients: INutrient[];
  formTwo: FormGroup;

  constructor(private storeService: StoreService,
              private recipeCategoryService: RecipeCategoryService,
              private ingredientService: IngredientService,
              private recipeService: RecipeService,
              private nutrientService: NutrientService) {
    this.createForm();
    this.createFormTwo();
  }

  ngOnInit(): void {
    this.recipeCategoryService.getAll().subscribe(value => this.categories = value);
    this.ingredientService.getAll().subscribe(value => this.ingredients = value);
    this.nutrientService.getAll().subscribe(value => this.nutrients = value);
  }

  private createForm() {
    this.form = new FormGroup({
      title: new FormControl(null),
      recipeCategoryId: new FormControl(null)
    })
  }

  private createFormTwo() {
    this.formTwo = new FormGroup({
      nutrientId: new FormControl(null)
    })
  }

  submit(): void {
    let rawValue = this.form.getRawValue();
    console.log(rawValue);
    this.recipeService.getFiltered(rawValue.recipeCategoryId, rawValue.title)?.subscribe(rawValue => {
      this.storeService.recipes.next(rawValue);
      // this.recipes = rawValue
    });
  }

  submitTwo() {
    let rawValue = this.formTwo.getRawValue();
    console.log(rawValue);
    this.recipeService.getSortedByNutrient(rawValue.nutrientId).subscribe(value => {
      this.storeService.recipes.next(value)
    });
  }
}
