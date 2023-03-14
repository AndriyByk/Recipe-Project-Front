import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipesPageRoutingModule} from './recipes-page-routing.module';
import {RecipesPageComponent} from './recipes-page/recipes-page.component';
import {RecipeComponent} from "../../components/recipes/recipe/recipe.component";
import {HttpClientModule} from "@angular/common/http";
import {RecipeService} from "../../services/fetches/recipes/recipe.service";
import {FooterComponent} from "../../components/recipes/footer/footer.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesResolver} from "../../services/fetches/recipes/recipes.resolver";
import {RecipesHeaderComponent} from "../../components/recipes/recipes-header/recipes-header.component";
import {RecipesByParamsResolver} from "../../services/fetches/recipes/recipes-by-params.resolver";
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
  // чи потрібні тут ресолвери? працювало й без них
  providers: [
    RecipeService,
    RecipesResolver,
    RecipesByParamsResolver
  ]
})
export class RecipesPageModule {
}
