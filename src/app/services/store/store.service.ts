import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IRecipe} from "../../interfaces/entities/recipe/IRecipe";
import {INorm} from "../../interfaces/entities/user/INorm";
import {IUser} from "../../interfaces/entities/user/IUser";
import {IPageInfo} from "../../interfaces/pages/IPageInfo";
import {ISearchDetails} from "../../interfaces/pages/ISearchDetails";

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
  isUserSignedIn = new BehaviorSubject<boolean>(false);
  norms = new BehaviorSubject<INorm[]>([{
    quantity: 0,
    nameOfNutrient: "",
    unit: "",
    idOfNutrient: 0
  }]);

  recipes = new BehaviorSubject<IRecipe[]>([{
    id: 0,
    image: "",
    description: "",
    dateOfCreation: "",
    rating: 0.,
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
    quantities: [],
    quantitiesPer100: [],
    ranks: []
  }]);
  createdRecipes = new BehaviorSubject<IRecipe[]>([{
    id: 0,
    image: "",
    description: "",
    dateOfCreation: "",
    rating: 0.,
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
    quantities: [],
    quantitiesPer100: [],
    ranks: []
  }])

  pageInfo = new BehaviorSubject<IPageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalRecipes: 0
  })

  pageSize = new BehaviorSubject<number>(10)

  searchDetails = new BehaviorSubject<ISearchDetails>({})

  maxHeight = new BehaviorSubject(0);

  constructor() {}
}
