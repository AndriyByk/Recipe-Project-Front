import {IGender} from "../../categories/IGender";
import {IActivityType} from "../../categories/IActivityType";
import {INorm} from "./INorm";

export interface IUser {
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
  createdRecipes: number[];
  favoriteRecipes: number[];
  userNorms: INorm[];
}
