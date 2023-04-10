import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {recipeUrl} from "../../../urls/urls";
import {INutrient} from "../../../interfaces/entities/nutrient/INutrient";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NutrientService {
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<INutrient[]> {
    return this.httpClient.get<INutrient[]>(`${this.baseURL}${recipeUrl.nutrients}`)
  }

  // getById(id: number) : Observable<INutrient> {
  //   return this.httpClient.get<INutrient>(`${this.baseURL}${recipeUrl.nutrients}/${id}?`)
  // }
}
