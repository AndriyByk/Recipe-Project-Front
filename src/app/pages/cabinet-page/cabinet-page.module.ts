import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetPageRoutingModule } from './cabinet-page-routing.module';
import { CabinetPageComponent } from './cabinet-page/cabinet-page.component';
import {UserInfoComponent} from "../../components/cabinet/user-info/user-info.component";
import {FavoriteRecipesComponent} from "../../components/cabinet/favorite-recipes/favorite-recipes.component";
import {FavoriteRecipeComponent} from "../../components/cabinet/favorite-recipe/favorite-recipe.component";
import {CreatedRecipesComponent} from "../../components/cabinet/created-recipes/created-recipes.component";
import {CreatedRecipeComponent} from "../../components/cabinet/created-recipe/created-recipe.component";


@NgModule({
  declarations: [
    CabinetPageComponent,
    UserInfoComponent,
    FavoriteRecipesComponent,
    FavoriteRecipeComponent,
    CreatedRecipesComponent,
    CreatedRecipeComponent
  ],
    imports: [
        CommonModule,
        CabinetPageRoutingModule
    ]
})
export class CabinetPageModule { }
