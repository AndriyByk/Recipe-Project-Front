import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {recipeUrl} from "../../urls/urls";
import {environment} from "../../../environments/environment";
import {IUser} from "../../interfaces/entities/user/IUser";
import {IToken} from "../../interfaces/token/IToken";

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {
  baseURL = environment.baseURL;
  private accessTokenKey = 'access';

  constructor(private httpClient: HttpClient) {
  }

  register(user: FormData): Observable<IUser> {
    return this.httpClient.post<IUser>(`${this.baseURL}${recipeUrl.signUp}`, user);
  }

  signIn(user: any): Observable<HttpResponse<IToken>> {
    return this.httpClient.post<IToken>(`${this.baseURL}${recipeUrl.signIn}`, user, {observe: 'response'});
  }

  setToken(token: string | null): void {
    if (token != null) {
      localStorage.setItem(this.accessTokenKey, token)
    }
  }

  getToken(): string {
    return localStorage.getItem(this.accessTokenKey) as string;
  }

  deleteToken(): void {
    localStorage.removeItem(this.accessTokenKey)
  }

  isAuthorizedUser(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }

  deleteTokenFromDB(access: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}${recipeUrl.cabinet}/${access}`)
  }
}
