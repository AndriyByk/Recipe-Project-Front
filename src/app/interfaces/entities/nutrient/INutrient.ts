import {INutrientCategory} from "../../categories/INutrientCategory";

export interface INutrient {
  name: string;
  about: string;
  categoryDto: INutrientCategory;
  quantity: number;
}
