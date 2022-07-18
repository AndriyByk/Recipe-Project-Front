import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../urls/urls";
import {HttpClient} from "@angular/common/http";
import {IIngredientCategory} from "../../interfaces/categories/IIngredientCategory";

@Injectable({
  providedIn: 'root'
})
export class IngredientCategoryService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IIngredientCategory[]> {
    return this.httpClient.get<IIngredientCategory[]>(`${baseURL}${recipeUrl.ingredientCategories}`);
  }
}
