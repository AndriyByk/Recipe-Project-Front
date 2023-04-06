import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {recipeUrl} from "../../../urls/urls";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipeCategoryService {
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IRecipeCategory[]> {
    return this.httpClient.get<IRecipeCategory[]>(`${this.baseURL}${recipeUrl.recipeCategories}`);
  }
}
