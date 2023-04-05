import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {baseURL, recipeUrl} from "../../../urls/urls";

@Component({
  selector: 'app-created-recipe',
  templateUrl: './created-recipe.component.html',
  styleUrls: ['./created-recipe.component.css']
})
export class CreatedRecipeComponent implements OnInit {
  @Input()
  recipeCreated: IRecipe;

  // url: string;
  fullImagePath: string;

  constructor() { }

  ngOnInit(): void {
    // for deploy
    this.fullImagePath = '/assets/pictures/recipe.jpg'
    // this.url = baseURL + recipeUrl.pictures;
  }

}
