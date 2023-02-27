import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-user-favorite-recipes-page',
  templateUrl: './user-favorite-recipes-page.component.html',
  styleUrls: ['./user-favorite-recipes-page.component.css']
})
export class UserFavoriteRecipesPageComponent implements OnInit {
  user: IUser;
  favoriteRecipes: IRecipe[];

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService) { }

  ngOnInit(): void {
      this.activatedRoute.data.subscribe(({user, favoriteRecipes}) => {
        this.user = user;
        this.favoriteRecipes = favoriteRecipes.recipes;
        this.storeService.pageInfoOfFavorite.next({
          currentPage: favoriteRecipes.currentPage,
          totalPages: favoriteRecipes.totalPages,
          totalRecipes: favoriteRecipes.totalRecipes
        })
      });
  }

}
