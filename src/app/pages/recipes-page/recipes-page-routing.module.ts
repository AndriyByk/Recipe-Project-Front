import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesPageComponent} from "./recipes-page/recipes-page.component";
import {RecipesResolver} from "../../services/fetches/recipes/recipes.resolver";
import {RecipesByParamsResolver} from "../../services/fetches/recipes/recipes-by-params.resolver";

const routes: Routes = [
  {
    path: 'find-and-sort/:pageNumber', runGuardsAndResolvers: 'always', component: RecipesPageComponent, resolve: {wrapperForRecipes: RecipesByParamsResolver}
  },
  {
    path: 'all-recipes/:pageNumber', runGuardsAndResolvers: 'always', component: RecipesPageComponent, resolve: {wrapperForRecipes: RecipesResolver}
  },
  {
    path: '', redirectTo: '/recipes/all-recipes/0', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesPageRoutingModule { }
