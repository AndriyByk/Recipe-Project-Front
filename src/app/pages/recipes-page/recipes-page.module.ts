import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipesPageRoutingModule} from './recipes-page-routing.module';
import {RecipesPageComponent} from './recipes-page/recipes-page.component';
import {RecipeComponent} from "../../components/recipes/recipe/recipe.component";
import {FilterComponent} from "../../components/recipes/filter/filter.component";
import {HttpClientModule} from "@angular/common/http";
import {RecipeService} from "../../services/fetches/recipe.service";


@NgModule({
  declarations: [
    RecipesPageComponent,
    RecipeComponent,
    FilterComponent
  ],
  exports: [
    RecipesPageComponent
  ],
  imports: [
    CommonModule,
    RecipesPageRoutingModule,
    HttpClientModule
  ],
  providers: [
    RecipeService
  ]
})
export class RecipesPageModule {
}
