import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRecipePageRoutingModule } from './update-recipe-page-routing.module';
import { UpdateRecipePageComponent } from './update-recipe-page/update-recipe-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RecipeByIdResolver} from "../../services/fetches/recipes/recipe-by-id.resolver";
import {RecipeCategoriesResolver} from "../../services/fetches/recipes/recipe-categories.resolver";
import {IngredientCategoriesResolver} from "../../services/fetches/ingredients/ingredient-categories.resolver";

@NgModule({
  declarations: [
    UpdateRecipePageComponent
  ],
  imports: [
    CommonModule,
    UpdateRecipePageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    RecipeByIdResolver,
    RecipeCategoriesResolver,
    IngredientCategoriesResolver
  ]
})
export class UpdateRecipePageModule { }
