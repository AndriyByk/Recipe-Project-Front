import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {RecipeService} from "../../../services/fetches/recipes/recipe.service";
import {StoreService} from "../../../services/store/store.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  recipes: IRecipe[];

  constructor(private recipeService: RecipeService,
              private storeService: StoreService,
              private activatedRoute: ActivatedRoute
  ) {
    this.storeService.recipes.subscribe(recipes => this.recipes = recipes);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({recipes}) => this.storeService.recipes.next(recipes))
  }
}
