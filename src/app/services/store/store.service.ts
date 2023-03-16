import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IRecipe} from "../../interfaces/entities/recipe/IRecipe";
import {INorm} from "../../interfaces/entities/user/INorm";
import {IUser} from "../../interfaces/entities/user/IUser";
import {IPageInfo} from "../../interfaces/pages/IPageInfo";
import {ISearchDetailsOfRecipes} from "../../interfaces/pages/ISearchDetailsOfRecipes";
import {ISearchDetailsUsers} from "../../interfaces/pages/ISearchDetailsUsers";

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
    roles: [],
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
    status: "",
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
    ranks: [],
    comments: []
  }]);
  createdRecipes = new BehaviorSubject<IRecipe[]>([{
    id: 0,
    image: "",
    description: "",
    dateOfCreation: "",
    rating: 0.,
    status: "",
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
    ranks: [],
    comments: []
  }]);


  //========== navigation =======================
  //__________ allRecipes _______________________
  pageInfo = new BehaviorSubject<IPageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  });
  pageSize = new BehaviorSubject<number>(10);
  searchDetails = new BehaviorSubject<ISearchDetailsOfRecipes>({
    recipeCategoryId: 0,
    nutrientId: 0,
    title: undefined,
    pageSize: 10
  });

  //__________ cabinet _______________________
  //.......... created .......................
  pageInfoOfCreated = new BehaviorSubject<IPageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  })
  pageNumberOfCreated = new BehaviorSubject<number>(0);
  pageSizeOfCreated = new BehaviorSubject<number>(10);
  searchDetailsOfCreated = new BehaviorSubject<ISearchDetailsOfRecipes>({
    recipeCategoryId: 0,
    nutrientId: 0,
    title: undefined,
    pageSize: 10
  });

  //.......... favorite ......................
  pageInfoOfFavorite = new BehaviorSubject<IPageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  })
  pageNumberOfFavorite = new BehaviorSubject<number>(0);
  pageSizeOfFavorite = new BehaviorSubject<number>(10);
  searchDetailsOfFavorite = new BehaviorSubject<ISearchDetailsOfRecipes>({
    recipeCategoryId: 0,
    nutrientId: 0,
    title: undefined,
    pageSize: 10
  });

  //.......... users .........................
  pageInfoUsers = new BehaviorSubject<IPageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  });
  pageNumberUsers = new BehaviorSubject<number>(0);
  pageSizeUsers = new BehaviorSubject<number>(50);
  searchDetailsUsers = new BehaviorSubject<ISearchDetailsUsers>({});

  //__________ user-page _______________________
  pageInfoOfUserCreated = new BehaviorSubject<IPageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  })
  pageNumberOfUserCreated = new BehaviorSubject<number>(0);
  pageSizeOfUserCreated = new BehaviorSubject<number>(10);

  //========== dynamic height of recipes-page ===
  maxHeight = new BehaviorSubject(0);

  constructor() {}
}
