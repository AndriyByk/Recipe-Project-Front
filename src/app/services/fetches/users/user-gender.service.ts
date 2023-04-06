import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {recipeUrl} from "../../../urls/urls";
import {IGender} from "../../../interfaces/categories/IGender";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserGenderService {
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IGender[]> {
    return this.httpClient.get<IGender[]>(`${this.baseURL}${recipeUrl.userGenders}`);
  }
}
