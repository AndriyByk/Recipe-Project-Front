import {IRecipe} from "./IRecipe";

export interface IWrapperForRecipes {
  totalRecipes: number,
  recipes: IRecipe[],
  totalPages: number,
  currentPage: number
}
