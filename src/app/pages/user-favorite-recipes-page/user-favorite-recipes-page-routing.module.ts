import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserFavoriteRecipesPageComponent} from "./user-favorite-recipes-page/user-favorite-recipes-page.component";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";

const routes: Routes = [
  {
    path: '', component: UserFavoriteRecipesPageComponent, resolve: {
      user: UserByUsernameResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFavoriteRecipesPageRoutingModule { }
