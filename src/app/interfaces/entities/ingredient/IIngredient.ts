import {IIngredientCategory} from "../../categories/IIngredientCategory";

export interface IIngredient {
  id: number;
  name: string;
  about: string;
  ingredientCategoryDto: IIngredientCategory;
  weight: number;
}
