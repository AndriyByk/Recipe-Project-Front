import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipesPageRoutingModule} from './recipes-page-routing.module';
import {RecipesPageComponent} from './recipes-page/recipes-page.component';
import {RecipeComponent} from "../../components/recipes/recipe/recipe.component";
import {HttpClientModule} from "@angular/common/http";
import {RecipeService} from "../../services/fetches/recipe.service";
import {FooterComponent} from "../../components/recipes/footer/footer.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RecipesPageComponent,
    RecipeComponent,
    FooterComponent
  ],
  exports: [
    RecipesPageComponent
  ],
  imports: [
    CommonModule,
    RecipesPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    RecipeService
  ]
})
export class RecipesPageModule {
}
