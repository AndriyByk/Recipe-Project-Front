import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {UserService} from "../../../services/fetches/user.service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input()
  recipe: IRecipe;
  private actualUser = 'actualUser';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }


  saveToFavorites() {
    let username = localStorage.getItem(this.actualUser);
    // let user: IUser =
    //   {
    //     id: 0,
    //     username: "",
    //     genderDto: {gender: "", id: 0},
    //     weight:0,
    //     height:0,
    //     email:"",
    //     name:"",
    //     lastName:"",
    //     avatar:"",
    //     password:"",
    //     dayOfBirth:"",
    //     dateOfRegistration:"",
    //     activityTypeDto: {about: "", name: "", id:0},
    //     createdRecipes: [],
    //     favoriteRecipes: [{}]
    //   }
    if (username != null) {
      this.userService.updateFavoriteRecipes(username, this.recipe.id.toString()).subscribe(value => console.log(value));
    }
  }
}

