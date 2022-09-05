import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetPageRoutingModule } from './cabinet-page-routing.module';
import { CabinetPageComponent } from './cabinet-page/cabinet-page.component';
import {UserInfoComponent} from "../../components/cabinet/user-info/user-info.component";
import {FavoriteRecipesComponent} from "../../components/cabinet/favorite-recipes/favorite-recipes.component";
import {FavoriteRecipeComponent} from "../../components/cabinet/favorite-recipe/favorite-recipe.component";


@NgModule({
  declarations: [
    CabinetPageComponent,
    UserInfoComponent,
    FavoriteRecipesComponent,
    FavoriteRecipeComponent
  ],
    imports: [
        CommonModule,
        CabinetPageRoutingModule
    ]
})
export class CabinetPageModule { }
