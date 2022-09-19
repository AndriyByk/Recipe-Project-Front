import {IRecipeCategory} from "../../categories/IRecipeCategory";
import {IIngredient} from "../ingredient/IIngredient";
import {INutrientDto} from "../nutrient/INutrientDto";
import {IUserAuthor} from "../user/IUserAuthor";

export interface IRecipe {
  id: number;
  image: string;
  title: string;
  description: string;
  recipeCategoryDto: IRecipeCategory;
  author: IUserAuthor;
  ingredients: IIngredient[];
  quantities: INutrientDto[];
}
