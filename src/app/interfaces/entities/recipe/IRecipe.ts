import {IRecipeCategory} from "../../categories/IRecipeCategory";
import {IIngredient} from "../ingredient/IIngredient";
import {INutrientDto} from "../nutrient/INutrientDto";
import {IUserAuthor} from "../user/IUserAuthor";
import {IComment} from "./IComment";

export interface IRecipe {
  id: number;
  image: string;
  title: string;
  description: string;
  dateOfCreation: string;
  rating: number;
  status: string;
  recipeCategoryDto: IRecipeCategory;
  author: IUserAuthor;
  ingredients: IIngredient[];
  quantities: INutrientDto[];
  quantitiesPer100: INutrientDto[];
  ranks: number[];
  comments: IComment[];
}
