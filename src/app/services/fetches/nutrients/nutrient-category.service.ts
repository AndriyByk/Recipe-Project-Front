import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {HttpClient} from "@angular/common/http";
import {INutrientCategory} from "../../../interfaces/categories/INutrientCategory";

@Injectable({
  providedIn: 'root'
})
export class NutrientCategoryService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<INutrientCategory[]> {
    return this.httpClient.get<INutrientCategory[]>(`${baseURL}${recipeUrl.nutrientCategories}`);
  }
}
