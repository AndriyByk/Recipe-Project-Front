import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserFavoriteRecipesPageRoutingModule} from './user-favorite-recipes-page-routing.module';
import {UserFavoriteRecipesPageComponent} from './user-favorite-recipes-page/user-favorite-recipes-page.component';
import {FavoriteRecipesComponent} from "../../components/cabinet/favorite-recipes/favorite-recipes.component";
import {FavoriteRecipeComponent} from "../../components/cabinet/favorite-recipe/favorite-recipe.component";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";


@NgModule({
  declarations: [
    UserFavoriteRecipesPageComponent,
    FavoriteRecipesComponent,
    FavoriteRecipeComponent
  ],
  exports: [
    FavoriteRecipesComponent,
    FavoriteRecipeComponent
  ],
  imports: [
    CommonModule,
    UserFavoriteRecipesPageRoutingModule
  ],
  providers: [
    UserByUsernameResolver
  ]
})
export class UserFavoriteRecipesPageModule {
}
