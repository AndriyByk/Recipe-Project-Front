import {IIngredientIdWithWeight} from "./IIngredientIdWithWeight";

export interface IRecipeForPost {
  title: string,
  description: string,
  dateOfCreation: string,
  recipeCategoryId: number
  rawIngredientWithWeights: IIngredientIdWithWeight[]
}
