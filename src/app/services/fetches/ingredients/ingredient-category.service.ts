import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {recipeUrl} from "../../../urls/urls";
import {HttpClient} from "@angular/common/http";
import {IIngredientCategory} from "../../../interfaces/categories/IIngredientCategory";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IngredientCategoryService {
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IIngredientCategory[]> {
    return this.httpClient.get<IIngredientCategory[]>(`${this.baseURL}${recipeUrl.ingredientCategories}`);
  }
}
