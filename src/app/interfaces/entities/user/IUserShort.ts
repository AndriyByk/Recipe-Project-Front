import {IRecipe} from "../recipe/IRecipe";

export interface IUserShort {
  id: number;
  username: string;
  avatar: string;
  dateOfRegistration: string;
  createdRecipes: IRecipe[];
}
