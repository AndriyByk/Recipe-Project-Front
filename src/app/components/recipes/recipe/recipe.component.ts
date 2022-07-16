import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input()
  recipe: IRecipe;

  constructor() {
  }

  ngOnInit(): void {
  }

}
