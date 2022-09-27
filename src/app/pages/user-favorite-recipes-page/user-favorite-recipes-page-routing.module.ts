import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserFavoriteRecipesPageComponent} from "./user-favorite-recipes-page/user-favorite-recipes-page.component";

const routes: Routes = [
  {
    path: '', component: UserFavoriteRecipesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFavoriteRecipesPageRoutingModule { }
