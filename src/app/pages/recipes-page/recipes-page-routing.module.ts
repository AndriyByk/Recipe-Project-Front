import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesPageComponent} from "./recipes-page/recipes-page.component";
import {RecipesResolver} from "../../services/fetches/recipes/recipes.resolver";
import {RecipesByCategoryIdResolver} from "../../services/fetches/recipes/recipes-by-category-id.resolver";
import {RecipesByNutrientIdResolver} from "../../services/fetches/recipes/recipes-by-nutrient-id.resolver";
import {RecipesByParamsResolver} from "../../services/fetches/recipes/recipes-by-params.resolver";

const routes: Routes = [
  {
    path: 'find-by-nutrient/:pageNumber', runGuardsAndResolvers: 'always', component: RecipesPageComponent, resolve: {wrapperForRecipes: RecipesByNutrientIdResolver}
  },
  {
    path: 'find-and-sort/:pageNumber', runGuardsAndResolvers: 'always', component: RecipesPageComponent, resolve: {wrapperForRecipes: RecipesByParamsResolver}
  },
  {
    path: 'find/:pageNumber', runGuardsAndResolvers: 'always', component: RecipesPageComponent, resolve: {wrapperForRecipes: RecipesByCategoryIdResolver}
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
