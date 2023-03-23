import {INutrientCategory} from "../../categories/INutrientCategory";

export interface INutrient {
  idOfNutrient: number;
  name: string;
  about: string;
  unit: string;
  categoryDto: INutrientCategory;
  quantity: number;
}
