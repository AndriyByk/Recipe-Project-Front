import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {recipeUrl} from "../../../urls/urls";
import {IActivityType} from "../../../interfaces/categories/IActivityType";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserActivityTypeService {
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IActivityType[]> {
    return this.httpClient.get<IActivityType[]>(`${this.baseURL}${recipeUrl.userActivityTypes}`);
  }
}
