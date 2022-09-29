import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {RecipeService} from "../../../services/fetches/recipe.service";
import {StoreService} from "../../../services/store/store.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  recipes: IRecipe[];

  constructor(private recipeService: RecipeService,
              private storeService: StoreService
  ) {
    this.storeService.recipes.subscribe(recipes => this.recipes = recipes);
  }

  ngOnInit(): void {
    this.recipeService.getAll().subscribe(value => {
      this.storeService.recipes.next(value);
      // this.recipes = value;
    })
  }
}
