import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UpdateRecipePageComponent} from "./update-recipe-page/update-recipe-page.component";
import {RecipeByIdResolver} from "../../services/fetches/recipes/recipe-by-id.resolver";

const routes: Routes = [
  {
    path: ':id', component: UpdateRecipePageComponent, resolve: { recipe: RecipeByIdResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateRecipePageRoutingModule {
}
