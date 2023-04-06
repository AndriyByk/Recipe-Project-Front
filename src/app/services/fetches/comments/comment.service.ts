import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {environment} from "../../../../environments/environment";
import {recipeUrl} from "../../../urls/urls";


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  save(comment: FormData, userId: number, recipeId: number, date: string): Observable<IRecipe> {
    return this.httpClient.post<IRecipe>(`${this.baseURL}${recipeUrl.comments}?userId=${userId}&recipeId=${recipeId}&date=${date}`, comment);
  }
  delete(commentId : number, recipeId: number): Observable<IRecipe> {
    return this.httpClient.delete<IRecipe>(`${this.baseURL}${recipeUrl.comments}?commentId=${commentId}&recipeId=${recipeId}`)
  }

}
