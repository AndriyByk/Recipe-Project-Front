import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-created-recipes',
  templateUrl: './created-recipes.component.html',
  styleUrls: ['./created-recipes.component.css']
})
export class CreatedRecipesComponent implements OnInit {

  // @Input()
  recipesCreated: IRecipe[];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.createdRecipes.subscribe(value => this.recipesCreated = value);
  }
}
