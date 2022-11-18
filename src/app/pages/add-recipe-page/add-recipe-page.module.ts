import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRecipePageRoutingModule } from './add-recipe-page-routing.module';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RecipeCategoriesResolver} from "../../services/fetches/recipes/recipe-categories.resolver";
import {IngredientsResolver} from "../../services/fetches/ingredients/ingredients.resolver";
import {IngredientCategoriesResolver} from "../../services/fetches/ingredients/ingredient-categories.resolver";


@NgModule({
  declarations: [
    AddRecipePageComponent
  ],
    imports: [
        CommonModule,
        AddRecipePageRoutingModule,
        ReactiveFormsModule
    ],
  providers: [
    RecipeCategoriesResolver,
    IngredientsResolver,
    IngredientCategoriesResolver
  ]
})
export class AddRecipePageModule { }
