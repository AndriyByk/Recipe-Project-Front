import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";

@Component({
  selector: 'app-favorite-recipe',
  templateUrl: './favorite-recipe.component.html',
  styleUrls: ['./favorite-recipe.component.css']
})
export class FavoriteRecipeComponent implements OnInit {
  @Input()
  recipeFavorite: IRecipe;

  constructor() { }

  ngOnInit(): void {
  }

}
