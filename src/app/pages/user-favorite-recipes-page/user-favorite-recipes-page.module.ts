import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFavoriteRecipesPageRoutingModule } from './user-favorite-recipes-page-routing.module';
import { UserFavoriteRecipesPageComponent } from './user-favorite-recipes-page/user-favorite-recipes-page.component';
import {FavoriteRecipesComponent} from "../../components/cabinet/favorite-recipes/favorite-recipes.component";
import {FavoriteRecipeComponent} from "../../components/cabinet/favorite-recipe/favorite-recipe.component";


@NgModule({
    declarations: [
        UserFavoriteRecipesPageComponent,
        FavoriteRecipesComponent,
        FavoriteRecipeComponent
    ],
    exports: [
        FavoriteRecipesComponent,
        FavoriteRecipeComponent
    ],
    imports: [
        CommonModule,
        UserFavoriteRecipesPageRoutingModule
    ]
})
export class UserFavoriteRecipesPageModule { }
