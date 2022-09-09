import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {UserService} from "../../../services/fetches/user.service";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {RecipeService} from "../../../services/fetches/recipe.service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input()
  recipe: IRecipe;
  private actualUser = 'actualUser';
  url: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.url = baseURL + recipeUrl.pictures;
  }


  saveToFavorites() {
    let username = localStorage.getItem(this.actualUser);
    if (username != null) {
      this.userService.updateFavoriteRecipes(username, this.recipe.id.toString()).subscribe(value => console.log(value));
    }
  }
}

