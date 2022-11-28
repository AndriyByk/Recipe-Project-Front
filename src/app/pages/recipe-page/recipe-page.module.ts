import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipePageRoutingModule} from './recipe-page-routing.module';
import {RecipePageComponent} from './recipe-page/recipe-page.component';
import {RecipeService} from "../../services/fetches/recipes/recipe.service";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";
import {RecipeByIdResolver} from "../../services/fetches/recipes/recipe-by-id.resolver";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RecipePageComponent
  ],
  exports: [
    RecipePageComponent
  ],
    imports: [
        CommonModule,
        RecipePageRoutingModule,
        ReactiveFormsModule
    ],
  providers: [
    RecipeService,
    UserByUsernameResolver,
    RecipeByIdResolver
  ]
})
export class RecipePageModule {
}
