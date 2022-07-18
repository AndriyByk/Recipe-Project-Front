import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../urls/urls";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../interfaces/entities/user/IUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${baseURL}${recipeUrl.users}`)
  }

  getById(id: number) : Observable<IUser> {
    return this.httpClient.get<IUser>(`${baseURL}${recipeUrl.users}/${id}?`)
  }
}
