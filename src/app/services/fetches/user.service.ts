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
    return this.httpClient.get<IUser>(`${baseURL}${recipeUrl.user}/${id}`)
  }

  getByUsername(username: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${baseURL}${recipeUrl.cabinet}/${username}`)
  }

  deleteById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${baseURL}${recipeUrl.users}/${id}`)
  }

  updateById(id: string, userForUpdate: Partial<IUser>): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${baseURL}${recipeUrl.users}/${id}`, userForUpdate);
  }

  updateByUsername(username: string, user: FormData): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${baseURL}${recipeUrl.user}/${username}`, user);
  }

  updateFavoriteRecipes(username: string, recipeId: string): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${baseURL}${recipeUrl.users}/update/${username}`, recipeId);
  }

  calculateNorms(user: IUser): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${baseURL}${recipeUrl.users}/norms/${user.username}`, user);
  }
}
