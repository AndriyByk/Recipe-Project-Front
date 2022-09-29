import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../../../services/fetches/recipe.service";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {UserService} from "../../../services/fetches/user.service";
import {INorm} from "../../../interfaces/entities/user/INorm";
import {INutrientDto} from "../../../interfaces/entities/nutrient/INutrientDto";
import {IProportion} from "../../../interfaces/entities/nutrient/IProportion";

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
  norms: INorm[];
  quantities: INutrientDto[];
  proportions: IProportion[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.url = baseURL + recipeUrl.pictures;

    // юзер
    let username = localStorage.getItem(this.actualUser);
    if (username) {
      this.userService.getByUsername(username).subscribe(user => {
        this.user = user;


        // рецепт
        this.activatedRoute.params.subscribe(({id}) => {
          // інфа з історії
          let {state: {data}} = history;
          console.log(data);
          if (data != null) {
            // опис рецепта
            this.stages = data.description.split(".");
            this.recipe = data as IRecipe;

            // пропорції
            for (let i = 0; i < user.userNorms.length; i++) {
              for (let j = 0; j < data.quantities.length; j++) {
                if (user.userNorms[i].idOfNutrient == data.quantities[j].nutrientDto.idOfNutrient) {
                  this.proportions.push({
                    idOfNutrient: user.userNorms[i].idOfNutrient,
                    nutrient: user.userNorms[i].nameOfNutrient,
                    percentage: (user.userNorms[i].quantity / data.quantities[j].nutrientDto.quantity)
                  })
                }
              }
            }
          } else {
            // якщо нема - то запит до бази:
            this.recipeService.getById(id).subscribe(recipe => {
              this.recipe = recipe;
              // опис рецепта
              this.stages = recipe.description.split(".");

              // пропорції
              for (let i = 0; i < user.userNorms.length; i++) {
                for (let j = 0; j < recipe.quantities.length; j++) {
                  if (user.userNorms[i].idOfNutrient == recipe.quantities[j].nutrientDto.idOfNutrient) {
                    this.proportions.push({
                      idOfNutrient: user.userNorms[i].idOfNutrient,
                      nutrient: user.userNorms[i].nameOfNutrient,
                      percentage: (Math.round(user.userNorms[i].quantity) / Math.round(recipe.quantities[j].nutrientDto.quantity))
                    })
                  }
                }
              }
            });
          }
        });
      });
    }
  }
}
