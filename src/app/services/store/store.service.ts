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
  //========== user =============================
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
  });
  isUserSignedIn = new BehaviorSubject<boolean>(false);
  norms = new BehaviorSubject<INorm[]>([{
    quantity: 0,
    engNameOfNutrient: "",
    ukrNameOfNutrient: "",
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
  }]);

  //========== navigation =======================
  //---------- allRecipes -----------------------
  pageInfo = new BehaviorSubject<IPageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalRecipes: 0
  });
  pageSize = new BehaviorSubject<number>(10);
  searchDetails = new BehaviorSubject<ISearchDetails>({});

  //---------- cabinet --------------------------
  pageInfoOfCreated = new BehaviorSubject<IPageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalRecipes: 0
  })
  pageInfoOfFavorite = new BehaviorSubject<IPageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalRecipes: 0
  })

  pageNumberOfCreated = new BehaviorSubject<number>(0);
  pageNumberOfFavorite = new BehaviorSubject<number>(0);

  pageSizeOfCreated = new BehaviorSubject<number>(10);
  pageSizeOfFavorite = new BehaviorSubject<number>(10);

  searchDetailsOfCreated = new BehaviorSubject<ISearchDetails>({});
  searchDetailsOfFavorite = new BehaviorSubject<ISearchDetails>({});


  //========== dynamic height of recipes-page ===
  maxHeight = new BehaviorSubject(0);

  constructor() {}
}
