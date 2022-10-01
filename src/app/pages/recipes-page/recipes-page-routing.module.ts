import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesPageComponent} from "./recipes-page/recipes-page.component";
import {RecipesResolver} from "../../services/fetches/recipes/recipes.resolver";

const routes: Routes = [
  {
    path: '', component: RecipesPageComponent, resolve: {recipes: RecipesResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesPageRoutingModule { }
