import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../../../services/fetches/recipe.service";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {UserService} from "../../../services/fetches/user.service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  recipe: IRecipe;
  url: string;
  stages: string[];
  user: IUser;
  private actualUser = 'actualUser';

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.url = baseURL + recipeUrl.pictures;
    let username = localStorage.getItem(this.actualUser);
    if (username)
      this.userService.getByUsername(username).subscribe(value => this.user = value);

    this.activatedRoute.params.subscribe(({id}) => {
      // інфа з історії
      let {state: {data}} = history;
      console.log(data);
      if (data != null) {
        this.stages = data.description.split(".");
        this.recipe = data as IRecipe;
      } else {
        // якщо нема - то запит до бази:
        this.recipeService.getById(id).subscribe(recipe => {
          this.recipe = recipe;
          this.stages = recipe.description.split(".");
        });
      }
    });

  }

}
