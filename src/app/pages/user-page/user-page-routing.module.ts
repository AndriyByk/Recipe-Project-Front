import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPageComponent} from "./user-page/user-page.component";
import {UserByIdResolver} from "../../services/fetches/users/user-by-id.resolver";
import {RecipesCreatedResolver} from "../../services/fetches/recipes/recipes-created.resolver";

const routes: Routes = [
  {
    path: ':id', component: UserPageComponent, resolve: {
      user: UserByIdResolver,
      createdRecipes: RecipesCreatedResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
