import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../urls/urls";
import {IUser} from "../../interfaces/entities/user/IUser";

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  constructor(private httpClient: HttpClient) { }

  register(user: FormData):Observable<IUser> {
    console.log(user.get('pageNumber'));

    return this.httpClient.post<IUser>(`${baseURL}${recipeUrl.users}`, user)
  }

}
