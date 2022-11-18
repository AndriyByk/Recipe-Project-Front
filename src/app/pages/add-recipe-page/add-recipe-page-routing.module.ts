import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddRecipePageComponent} from "./add-recipe-page/add-recipe-page.component";
import {RecipeCategoriesResolver} from "../../services/fetches/recipes/recipe-categories.resolver";
import {IngredientsResolver} from "../../services/fetches/ingredients/ingredients.resolver";
import {IngredientCategoriesResolver} from "../../services/fetches/ingredients/ingredient-categories.resolver";

const routes: Routes = [
  {
    path: '', component: AddRecipePageComponent, resolve: {
      categories: RecipeCategoriesResolver,
      ingredients: IngredientsResolver,
      ingredientCategories: IngredientCategoriesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRecipePageRoutingModule { }
