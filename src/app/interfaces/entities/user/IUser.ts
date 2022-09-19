import {IGender} from "../../categories/IGender";
import {IActivityType} from "../../categories/IActivityType";
import {IRecipe} from "../recipe/IRecipe";
import {INorm} from "./INorm";

export interface IUser {

  // об'єкт який відображається на фронті з бази

  id: number;
  username: string;
  password: string;
  avatar: string;
  email:string;
  weight: number;
  height: number;
  dayOfBirth: string;
  genderDto: IGender;
  activityTypeDto: IActivityType;
  name: string;
  lastName: string;
  dateOfRegistration: string;
  favoriteRecipes: IRecipe[];
  createdRecipes: IRecipe[];
  userNorms: INorm[];
}
