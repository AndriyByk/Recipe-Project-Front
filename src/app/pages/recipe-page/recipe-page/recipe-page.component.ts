import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../../../services/fetches/recipe.service";
import {baseURL, recipeUrl} from "../../../urls/urls";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  recipe: IRecipe;
  url: string;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.url = baseURL + recipeUrl.pictures;
    this.activatedRoute.params.subscribe(({id}) => {
      // інфа з історії
      let {state: {data}} = history;
      console.log(data);
      if (data != null) {
        console.log(data);
        this.recipe = data as IRecipe;
      } else {
        // якщо нема - то запит до бази:
        this.recipeService.getById(id).subscribe(recipe => this.recipe = recipe);
      }
    })
  }

}
