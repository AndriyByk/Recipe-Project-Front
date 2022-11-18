import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCreatedRecipesPageRoutingModule } from './user-created-recipes-page-routing.module';
import { UserCreatedRecipesPageComponent } from './user-created-recipes-page/user-created-recipes-page.component';
import {CreatedRecipesComponent} from "../../components/cabinet/created-recipes/created-recipes.component";
import {CreatedRecipeComponent} from "../../components/cabinet/created-recipe/created-recipe.component";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";


@NgModule({
    declarations: [
        UserCreatedRecipesPageComponent,
        CreatedRecipesComponent,
        CreatedRecipeComponent
    ],
  imports: [
    CommonModule,
    UserCreatedRecipesPageRoutingModule
  ],
  providers: [
    UserByUsernameResolver
  ]
})
export class UserCreatedRecipesPageModule { }
