import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../urls/urls";
import {IRecipe} from "../../interfaces/entities/recipe/IRecipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IRecipe[]> {
    return this.httpClient.get<IRecipe[]>(`${baseURL}${recipeUrl.recipes}?pageSize=20&pageNumber=0`)
  }

  getById(id: number) : Observable<IRecipe> {
    return this.httpClient.get<IRecipe>(`${baseURL}${recipeUrl.recipes}/${id}`)
  }

  save(recipe: FormData, username: string) : Observable<IRecipe[]> {
    return this.httpClient.post<IRecipe[]>(`${baseURL}${recipeUrl.recipes}/${username}`, recipe);
  }

  updateRecipe(formData: FormData, id: number) {
    return this.httpClient.patch<IRecipe>(`${baseURL}${recipeUrl.recipes}/${id}`, formData)
  }

  getFiltered(recipeCategoryId: number, title: string): Observable<IRecipe[]> | null {
    if (recipeCategoryId != null && recipeCategoryId != 0) {
      if (title != null) {
        console.log("recipeCategoryId != null ======== title != null")
        return this.httpClient.get<IRecipe[]>(`${baseURL}${recipeUrl.recipes}/find?categoryId=${recipeCategoryId}&title=${title}`);
      } else {
        console.log("recipeCategoryId != null ======== title == null")
        return this.httpClient.get<IRecipe[]>(`${baseURL}${recipeUrl.recipes}/find?categoryId=${recipeCategoryId}`);
      }
    } else {
      if (title != null) {
        console.log("recipeCategoryId == null ======== title != null")
        return this.httpClient.get<IRecipe[]>(`${baseURL}${recipeUrl.recipes}/find?title=${title}`);
      } else {
        console.log("recipeCategoryId == null ======== title == null")
        return this.getAll();
      }
    }
  }

  getSortedByNutrient(nutrientId: number) {
    return this.httpClient.get<IRecipe[]>(`${baseURL}${recipeUrl.recipes}/find-by-nutrient/${nutrientId}`)
  }
}
