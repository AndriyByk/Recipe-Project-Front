import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IRecipe} from "../../interfaces/entities/recipe/IRecipe";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  recipes = new BehaviorSubject<IRecipe[]>([{
    id: 0,
    image: "",
    description: "",
    ingredients: [],
    recipeCategoryDto: {
      id: 0,
      name: ""
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
    title: "",
    quantities: []
  }]);

  isUserSignedIn = new BehaviorSubject<boolean>(false);

  constructor() {
  }
}
