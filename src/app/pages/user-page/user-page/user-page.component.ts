import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IUserShort} from "../../../interfaces/entities/user/IUserShort";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: IUserShort;
  createdRecipes: IRecipe[];
  url: string;
  urlToRecipe: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    localStorage.getItem('actualUser')?this.urlToRecipe = "/recipe/username":this.urlToRecipe = "/recipe";

    this.url = baseURL + recipeUrl.pictures;
    this.activatedRoute.data.subscribe(({user, createdRecipes}) => {
      this.user = user;
      this.createdRecipes = createdRecipes.recipes;
    });
  }
}
