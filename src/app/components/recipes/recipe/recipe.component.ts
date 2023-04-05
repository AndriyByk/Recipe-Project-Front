import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {baseURL, recipeUrl} from "../../../urls/urls";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input()
  recipe: IRecipe;
  private actualUser = 'actualUser';
  url: string;
  username: string | null;
  link: string;

  fullImagePath: string;

  constructor() {
  }

  ngOnInit(): void {
    // this.url = baseURL + recipeUrl.pictures;
    this.fullImagePath = '/assets/pictures/recipe.jpg'
    this.username = localStorage.getItem(this.actualUser);
    if (this.username != null && this.username!='') {
      this.link = '/recipe/username';
    } else {
      this.link = '/recipe';
    }
  }
}

