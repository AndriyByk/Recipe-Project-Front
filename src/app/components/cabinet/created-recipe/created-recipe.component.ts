import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";

@Component({
  selector: 'app-created-recipe',
  templateUrl: './created-recipe.component.html',
  styleUrls: ['./created-recipe.component.css']
})
export class CreatedRecipeComponent implements OnInit {
  @Input()
  recipeCreated: IRecipe

  constructor() { }

  ngOnInit(): void {
  }

}
