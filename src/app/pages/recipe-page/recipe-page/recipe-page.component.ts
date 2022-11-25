import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {ActivatedRoute} from "@angular/router";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {INorm} from "../../../interfaces/entities/user/INorm";
import {INutrientDto} from "../../../interfaces/entities/nutrient/INutrientDto";
import {IProportion} from "../../../interfaces/entities/nutrient/IProportion";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  url: string;
  private actualUser = 'actualUser';

  recipe: IRecipe;
  stages: string[];
  user: IUser;

  norms: INorm[];
  quantities: INutrientDto[];
  proportions: IProportion = {
    energy: [],
    minerals: [],
    vitamins: [],
    organics: []
  };

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.url = baseURL + recipeUrl.pictures;

    if (localStorage.getItem(this.actualUser)) {
      this.activatedRoute.data.subscribe(({user, recipe}) => {
        this.recipe = recipe;
        this.stages = recipe.description.split(".");
        this.user = user;

        console.log(this.recipe);
        for (let j = 0, i = 0; j < recipe.quantities.length; j++) {
          if (j == 0) {
            this.proportions.energy.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              percentage: Math.ceil(Math.ceil(recipe.quantities[j].nutrientDto.quantity / user.userNorms[i].quantity * 1000) / 10),
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              userNorm: user.userNorms[i].quantity,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            });
            // лічильник "і" змінюється лише для тих нутрієнтів, де є норми
            // є медіумом між масивом норм і
            i++;
          } else if (j == 1 || j == 2 || j == 6) {
            this.proportions.organics.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              percentage: Math.ceil(Math.ceil(recipe.quantities[j].nutrientDto.quantity / user.userNorms[i].quantity * 1000) / 10),
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              userNorm: user.userNorms[i].quantity,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            });
            i++;
          } else if ((j > 2 && j < 6) || (j > 6 && j < 9)) {
            this.proportions.organics.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            });
          } else if ((j >= 9 && j < 13) || j > 13 && j < 22) {
            this.proportions.vitamins.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              percentage: Math.ceil(Math.ceil(recipe.quantities[j].nutrientDto.quantity / user.userNorms[i].quantity * 1000) / 10),
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              userNorm: user.userNorms[i].quantity,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            })
            i++;
          } else if (j == 13) {
            this.proportions.vitamins.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            })
          } else if (j >= 22 && j < 25) {
            this.proportions.minerals.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            })
          } else if (j > 24) {
            this.proportions.minerals.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              percentage: Math.ceil(Math.ceil(recipe.quantities[j].nutrientDto.quantity / user.userNorms[i].quantity * 1000) / 10),
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              userNorm: user.userNorms[i].quantity,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            })
            i++;
          }
        }
      })
    } else {
      this.activatedRoute.data.subscribe(({recipe}) => {
        this.recipe = recipe;
        this.stages = recipe.description.split(".");


        for (let j = 0; j < recipe.quantities.length; j++) {
          if (j == 0) {
            this.proportions.energy.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            });
          } else if (j >= 1 && j < 9) {
            this.proportions.organics.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            });
          } else if (j >= 9 && j < 22) {
            this.proportions.vitamins.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            });
          } else if (j >= 22) {
            this.proportions.minerals.push({
              idOfNutrient: recipe.quantities[j].nutrientDto.idOfNutrient,
              nutrient: recipe.quantities[j].nutrientDto.name,
              category: recipe.quantities[j].nutrientDto.categoryDto.name,
              nutrientQuantity: recipe.quantities[j].nutrientDto.quantity
            });
          }
        }
      })
    }
    // // юзер
    // let username = localStorage.getItem(this.actualUser);
    // if (username) {
    //   this.userService.getByUsername(username).subscribe(user => {
    //     this.user = user;
    //
    //
    //     // рецепт
    //     this.activatedRoute.params.subscribe(({id}) => {
    //       // інфа з історії
    //       let {state: {data}} = history;
    //       console.log(data);
    //       if (data != null) {
    //         // опис рецепта
    //         this.stages = data.description.split(".");
    //         this.recipe = data as IRecipe;
    //
    //         // пропорції
    //         for (let i = 0; i < user.userNorms.length; i++) {
    //           for (let j = 0; j < data.quantities.length; j++) {
    //             if (user.userNorms[i].idOfNutrient == data.quantities[j].nutrientDto.idOfNutrient) {
    //               this.proportions.push({
    //                 idOfNutrient: user.userNorms[i].idOfNutrient,
    //                 nutrient: user.userNorms[i].nameOfNutrient,
    //                 percentage: (user.userNorms[i].quantity / data.quantities[j].nutrientDto.quantity)
    //               })
    //             }
    //           }
    //         }
    //       } else {
    //         // якщо нема - то запит до бази:
    //         this.recipeService.getById(id).subscribe(recipe => {
    //           this.recipe = recipe;
    //           // опис рецепта
    //           this.stages = recipe.description.split(".");
    //
    //           // пропорції
    //           for (let i = 0; i < user.userNorms.length; i++) {
    //             for (let j = 0; j < recipe.quantities.length; j++) {
    //               if (user.userNorms[i].idOfNutrient == recipe.quantities[j].nutrientDto.idOfNutrient) {
    //                 this.proportions.push({
    //                   idOfNutrient: user.userNorms[i].idOfNutrient,
    //                   nutrient: user.userNorms[i].nameOfNutrient,
    //                   percentage: (Math.round(user.userNorms[i].quantity) / Math.round(recipe.quantities[j].nutrientDto.quantity))
    //                 })
    //               }
    //             }
    //           }
    //         });
    //       }
    //     });
    //   });
    // }
  }
}
