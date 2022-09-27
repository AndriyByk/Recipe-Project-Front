import {IIngredientIdWithWeight} from "./IIngredientIdWithWeight";

export interface IRecipeForUpdate {
  description: string,
  recipeCategoryId: number
  rawIngredientWithWeights: IIngredientIdWithWeight[]
}
