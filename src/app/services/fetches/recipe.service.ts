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
    return this.httpClient.get<IRecipe[]>(`${baseURL}${recipeUrl.recipes}?pageSize=8&pageNumber=5`)
    // return this.httpClient.get<IRecipe[]>(`${baseURL}${recipeUrl.recipes}`)
  }

  getById(id: number) : Observable<IRecipe> {
    return this.httpClient.get<IRecipe>(`${baseURL}${recipeUrl.recipes}/${id}?`)
  }

  save(recipe: FormData) : void {
    this.httpClient.post(`${baseURL}${recipeUrl.recipes}`, recipe);
  }
}
