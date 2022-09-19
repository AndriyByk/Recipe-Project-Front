import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipePageRoutingModule} from './recipe-page-routing.module';
import {RecipePageComponent} from './recipe-page/recipe-page.component';
import {RecipeService} from "../../services/fetches/recipe.service";


@NgModule({
  declarations: [
    RecipePageComponent
  ],
  exports: [
    RecipePageComponent
  ],
  imports: [
    CommonModule,
    RecipePageRoutingModule
  ],
  providers: [
    RecipeService
  ]
})
export class RecipePageModule {
}
