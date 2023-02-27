import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {StoreService} from "../../../services/store/store.service";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";

@Component({
  selector: 'app-user-created-recipes-page',
  templateUrl: './user-created-recipes-page.component.html',
  styleUrls: ['./user-created-recipes-page.component.css']
})
export class UserCreatedRecipesPageComponent implements OnInit {
  user: IUser;
  createdRecipes: IRecipe[];

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService) { }

  ngOnInit(): void {
      this.activatedRoute.data.subscribe(({user, createdRecipes}) => {
        this.user = user;
        this.createdRecipes = createdRecipes.recipes;
        this.storeService.createdRecipes.next(createdRecipes.recipes);
        this.storeService.pageInfoOfCreated.next({
          currentPage: createdRecipes.currentPage,
          totalPages: createdRecipes.totalPages,
          totalRecipes: createdRecipes.totalRecipes
        })
      })
  }
}
