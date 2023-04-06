import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {recipeUrl} from "../../../urls/urls";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../../interfaces/entities/user/IUser";
import {IUserShort} from "../../../interfaces/entities/user/IUserShort";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) {
  }

  getAll(pageNumber: number, pageSize: number): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.baseURL}${recipeUrl.users}/${pageNumber}?pageSize=${pageSize}`)
  }

  getChosen(pageNumber: number, pageSize: number, username: string, role: number): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.baseURL}${recipeUrl.users}/chosen/${pageNumber}?pageSize=${pageSize}&username=${username}&role=${role}`)
  }

  changeRole(pageNumber: number, pageSize: number, userId: number, role: number): Observable<IUser[]> {
    return this.httpClient.patch<IUser[]>(`${this.baseURL}${recipeUrl.users}/${userId}?role=${role}&pageNumber=${pageNumber}&pageSize=${pageSize}`, "body")
  }

  getById(id: number): Observable<IUserShort> {
    return this.httpClient.get<IUserShort>(`${this.baseURL}${recipeUrl.user}/${id}`)
  }

  getByUsername(username: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseURL}${recipeUrl.cabinet}/${username}`)
  }

  deleteById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}${recipeUrl.users}/${id}`)
  }

  updateByUsername(username: string, user: FormData): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${this.baseURL}${recipeUrl.user}/${username}`, user);
  }

  updateFavoriteRecipes(username: string, recipeId: string): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${this.baseURL}${recipeUrl.users}/update/${username}`, recipeId);
  }

  calculateNorms(user: IUser): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${this.baseURL}${recipeUrl.users}/norms/${user.username}`, "user");
  }

  getRateById(userId: number, recipeId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}${recipeUrl.users}/rates?userId=${userId}&recipeId=${recipeId}`);
  }
}
