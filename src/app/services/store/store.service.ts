import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IRecipe} from "../../interfaces/entities/recipe/IRecipe";
import {INorm} from "../../interfaces/entities/user/INorm";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  norms = new BehaviorSubject<INorm[]>([{
    quantity: 0,
    nameOfNutrient: ""
  }])

  recipes = new BehaviorSubject<IRecipe[]>([{
    id: 0,
    image: "",
    description: "",
    ingredients: [],
    recipeCategoryDto: {
      id: 0,
      name: ""
    },
    author: {
      id:0,
      username: ""
    },
    title: "",
    quantities: []
  }]);

  favoriteRecipes = new BehaviorSubject<IRecipe[]>([{
    id: 0,
    image: "",
    description: "",
    ingredients: [],
    recipeCategoryDto: {
      id: 0,
      name: ""
    },
    author: {
      id:0,
      username: ""
    },
    title: "",
    quantities: []
  }]);

  isUserSignedIn = new BehaviorSubject<boolean>(false);

  constructor() {
  }
}
