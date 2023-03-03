import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {baseURL, recipeUrl} from "../../../urls/urls";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  save(comment: FormData, userId: number, recipeId: number, date: string): Observable<IRecipe> {
    return this.httpClient.post<IRecipe>(`${baseURL}${recipeUrl.comments}?userId=${userId}&recipeId=${recipeId}&date=${date}`, comment);
  }

}
