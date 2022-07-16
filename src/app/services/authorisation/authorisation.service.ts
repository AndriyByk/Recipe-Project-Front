import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../urls/urls";
import {IUserForPost} from "../../interfaces/entities/user/IUserForPost";

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  constructor(private httpClient: HttpClient) { }

  register(user: IUserForPost):Observable<IUserForPost> {
    console.log(user);

    const formData = new FormData();
    // formData.append()
    return this.httpClient.post<IUserForPost>(`${baseURL}${recipeUrl.users}`, user)
  }

}
