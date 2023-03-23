import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipesPageRoutingModule} from './recipes-page-routing.module';
import {RecipesPageComponent} from './recipes-page/recipes-page.component';
import {RecipeComponent} from "../../components/recipes/recipe/recipe.component";
import {HttpClientModule} from "@angular/common/http";
import {RecipeService} from "../../services/fetches/recipes/recipe.service";
import {FooterComponent} from "../../components/recipes/footer/footer.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesHeaderComponent} from "../../components/recipes/recipes-header/recipes-header.component";
import {DirectivesModule} from "../../directives/module/directives.module";


@NgModule({
  declarations: [
    RecipesPageComponent,
    RecipeComponent,
    FooterComponent,
    RecipesHeaderComponent
  ],
  exports: [
    RecipesPageComponent
  ],
  imports: [
    CommonModule,
    RecipesPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  providers: [
    RecipeService
  ]
})
export class RecipesPageModule {
}
