import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";

@Component({
  selector: 'app-created-recipes',
  templateUrl: './created-recipes.component.html',
  styleUrls: ['./created-recipes.component.css']
})
export class CreatedRecipesComponent implements OnInit {

  @Input()
  recipesCreated: IRecipe[];

  constructor() { }

  ngOnInit(): void {
  }

}
