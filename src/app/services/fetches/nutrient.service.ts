import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../urls/urls";
import {INutrient} from "../../interfaces/entities/nutrient/INutrient";

@Injectable({
  providedIn: 'root'
})
export class NutrientService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<INutrient[]> {
    return this.httpClient.get<INutrient[]>(`${baseURL}${recipeUrl.nutrients}`)
  }

  getById(id: number) : Observable<INutrient> {
    return this.httpClient.get<INutrient>(`${baseURL}${recipeUrl.nutrients}/${id}?`)
  }
}
