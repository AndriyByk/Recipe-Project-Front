import {INutrientCategory} from "../../categories/INutrientCategory";

export interface INutrient {
  idOfNutrient: number;
  name: string;
  about: string;
  categoryDto: INutrientCategory;
  quantity: number;
  // одиниці вимірювання:
  // units: string;

}
