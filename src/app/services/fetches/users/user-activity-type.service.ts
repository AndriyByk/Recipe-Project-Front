import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IActivityType} from "../../../interfaces/categories/IActivityType";

@Injectable({
  providedIn: 'root'
})
export class UserActivityTypeService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IActivityType[]> {
    return this.httpClient.get<IActivityType[]>(`${baseURL}${recipeUrl.userActivityTypes}`);
  }
}
