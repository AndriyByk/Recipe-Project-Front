import {IIngredientCategory} from "../../categories/IIngredientCategory";

export interface IIngredient {
  id: number;
  name: string;
  about: string;
  name_ukr: string;
  ingredientCategoryDto: IIngredientCategory;
  weight: number;
}
