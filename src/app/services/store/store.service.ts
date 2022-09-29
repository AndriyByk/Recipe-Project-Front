import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IRecipe} from "../../interfaces/entities/recipe/IRecipe";
import {INorm} from "../../interfaces/entities/user/INorm";
import {IUser} from "../../interfaces/entities/user/IUser";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  user = new BehaviorSubject<IUser>({
    id : 0,
    name : "",
    lastName : "",
    username : "",
    activityTypeDto : {id: 0, name: "", about: ""},
    avatar: "",
    createdRecipes: [],
    dateOfRegistration: "",
    dayOfBirth: "",
    email: "",
    favoriteRecipes: [],
    genderDto: {id: 0, gender: ""},
    height: 0,
    password: "",
    userNorms: [],
    weight: 0
  })

  norms = new BehaviorSubject<INorm[]>([{
    quantity: 0,
    nameOfNutrient: "",
    idOfNutrient: 0
  }])

  recipes = new BehaviorSubject<IRecipe[]>([{
    id: 0,
    image: "",
    description: "",
    dateOfCreation: "",
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
    dateOfCreation: "",
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
