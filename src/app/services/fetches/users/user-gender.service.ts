import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IGender} from "../../../interfaces/categories/IGender";

@Injectable({
  providedIn: 'root'
})
export class UserGenderService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IGender[]> {
    return this.httpClient.get<IGender[]>(`${baseURL}${recipeUrl.userGenders}`);
  }
}
