import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {UserService} from "../../../services/fetches/user.service";
import {baseURL, recipeUrl} from "../../../urls/urls";

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
  username: string | null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.url = baseURL + recipeUrl.pictures;
    this.username = localStorage.getItem(this.actualUser);
  }


  saveToFavorites() {
    if (this.username != null) {
      this.userService.updateFavoriteRecipes(this.username, this.recipe.id.toString()).subscribe(value => console.log(value));
    }
  }
}

