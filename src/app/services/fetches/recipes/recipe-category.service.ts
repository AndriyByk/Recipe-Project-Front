import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";

@Injectable({
  providedIn: 'root'
})
export class RecipeCategoryService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IRecipeCategory[]> {
    return this.httpClient.get<IRecipeCategory[]>(`${baseURL}${recipeUrl.recipeCategories}`);
  }
}
