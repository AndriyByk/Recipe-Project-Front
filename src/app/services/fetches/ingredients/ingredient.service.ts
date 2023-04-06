import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {recipeUrl} from "../../../urls/urls";
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IIngredient[]> {
    return this.httpClient.get<IIngredient[]>(`${this.baseURL}${recipeUrl.ingredients}`)
  }

  getById(id: number) : Observable<IIngredient> {
    return this.httpClient.get<IIngredient>(`${this.baseURL}${recipeUrl.ingredients}/${id}?`)
  }
}
