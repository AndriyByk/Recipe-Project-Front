import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {recipeUrl} from "../../../urls/urls";
import {HttpClient} from "@angular/common/http";
import {INutrientCategory} from "../../../interfaces/categories/INutrientCategory";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NutrientCategoryService {
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<INutrientCategory[]> {
    return this.httpClient.get<INutrientCategory[]>(`${this.baseURL}${recipeUrl.nutrientCategories}`);
  }
}
