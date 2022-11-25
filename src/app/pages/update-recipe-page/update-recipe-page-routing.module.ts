import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UpdateRecipePageComponent} from "./update-recipe-page/update-recipe-page.component";
import {RecipeByIdResolver} from "../../services/fetches/recipes/recipe-by-id.resolver";
import {RecipeCategoriesResolver} from "../../services/fetches/recipes/recipe-categories.resolver";
import {IngredientsResolver} from "../../services/fetches/ingredients/ingredients.resolver";
import {IngredientCategoriesResolver} from "../../services/fetches/ingredients/ingredient-categories.resolver";

const routes: Routes = [
  {
    path: ':id', component: UpdateRecipePageComponent, resolve: {
      recipe: RecipeByIdResolver,
      categories: RecipeCategoriesResolver,
      ingredients: IngredientsResolver,
      ingredientCategories : IngredientCategoriesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRecipePageRoutingModule {
}
