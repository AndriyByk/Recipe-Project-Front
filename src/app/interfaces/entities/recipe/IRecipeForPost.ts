import {IIngredientIdWithWeight} from "./IIngredientIdWithWeight";

export interface IRecipeForPost {

  // об'єкт який поститься на бек
  // (це той об'єкт який надсилаємо в постмені)

  title: string,
  description: string,
  dateOfCreation: string,
  recipeCategoryId: number
  rawIngredientWithWeights: IIngredientIdWithWeight[]
}
