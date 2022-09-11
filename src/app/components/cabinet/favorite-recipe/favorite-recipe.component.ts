import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {baseURL, recipeUrl} from "../../../urls/urls";

@Component({
  selector: 'app-favorite-recipe',
  templateUrl: './favorite-recipe.component.html',
  styleUrls: ['./favorite-recipe.component.css']
})
export class FavoriteRecipeComponent implements OnInit {
  @Input()
  recipeFavorite: IRecipe;
  url: string;

  constructor() { }

  ngOnInit(): void {
    this.url = baseURL + recipeUrl.pictures;
  }

}
