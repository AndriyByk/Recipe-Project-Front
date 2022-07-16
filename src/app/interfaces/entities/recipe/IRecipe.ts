import {IRecipeCategory} from "../../categories/IRecipeCategory";
import {IIngredient} from "../ingredient/IIngredient";
import {INutrientDto} from "../nutrient/INutrientDto";

export interface IRecipe {
  id: number;
  image: string;
  title: string;
  description: string;
  recipeCategoryDto: IRecipeCategory;
  ingredients: IIngredient[];
  quantities: INutrientDto[];
}
