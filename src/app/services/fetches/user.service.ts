import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../urls/urls";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../interfaces/entities/user/IUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${baseURL}${recipeUrl.users}`)
  }

  getById(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(`${baseURL}${recipeUrl.users}/${id}`)
  }

  getByUsername(username: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${baseURL}${recipeUrl.cabinet}/${username}`)
  }

  deleteById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${baseURL}${recipeUrl.cabinet}/${id}`)
  }

  updateById(id: string, userForUpdate: Partial<IUser>): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${baseURL}${id}`, userForUpdate);
  }

}
