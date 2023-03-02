import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {RecipesUncheckedResolver} from "../../services/fetches/recipes/recipes-unchecked.resolver";

const routes: Routes = [
  {
    path: ':pageNumber',
    runGuardsAndResolvers: 'always',
    component: AdminPageComponent,
    resolve: {
      uncheckedRecipes: RecipesUncheckedResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
