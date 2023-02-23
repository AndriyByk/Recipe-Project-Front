import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {RecipeService} from "../../../services/fetches/recipes/recipe.service";
import {StoreService} from "../../../services/store/store.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  recipes: IRecipe[];
  maxHeight: number;

  constructor(private recipeService: RecipeService,
              private storeService: StoreService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {
    this.storeService.recipes.subscribe(recipes => this.recipes = recipes);
    this.storeService.maxHeight.subscribe(value => this.maxHeight = value)
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({wrapperForRecipes}) => {
      console.log(wrapperForRecipes);
      this.storeService.pageInfo.next({
        currentPage: wrapperForRecipes.currentPage,
        totalPages: wrapperForRecipes.totalPages,
        totalRecipes: wrapperForRecipes.totalRecipes
      })
      this.storeService.recipes.next(wrapperForRecipes.recipes)
    })
  }

  returnToAll() {
    this.storeService.searchDetails.next({});
    this.router.navigate(['recipes/all-recipes', 0], {
      queryParams: {
        pageSize: 10
      }
    });
  }
}
