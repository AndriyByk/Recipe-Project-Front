import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../urls/urls";
import {IIngredient} from "../../interfaces/entities/ingredient/IIngredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IIngredient[]> {
    return this.httpClient.get<IIngredient[]>(`${baseURL}${recipeUrl.ingredients}`)
  }

  getById(id: number) : Observable<IIngredient> {
    return this.httpClient.get<IIngredient>(`${baseURL}${recipeUrl.ingredients}/${id}?`)
  }
}
