import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, recipeUrl} from "../../../urls/urls";
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {StoreService} from "../../store/store.service";
import {IPageInfo} from "../../../interfaces/pages/IPageInfo";
import {IWrapperForRecipes} from "../../../interfaces/entities/recipe/IWrapperForRecipes";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private pageSize: number;
  private pageInfo: IPageInfo;

  constructor(private httpClient: HttpClient,
              private storeService: StoreService) {
    storeService.pageInfo.subscribe(value => {
      this.pageInfo = value;
      console.log(this.pageInfo);
    });
    storeService.pageSize.subscribe(value => this.pageSize = value);
  }

  getAll(
    pageNumber: number,
    pageSize: number): Observable<IWrapperForRecipes> {
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/allRecipes/${pageNumber}?pageSize=${pageSize}`)
  }

  getById(id: number): Observable<IRecipe> {
    return this.httpClient.get<IRecipe>(`${baseURL}${recipeUrl.recipes}/${id}`)
  }

  save(recipe: FormData, username: string): Observable<IRecipe[]> {
    return this.httpClient.post<IRecipe[]>(`${baseURL}${recipeUrl.recipes}/${username}`, recipe);
  }

  updateRecipe(formData: FormData, id: number) {
    return this.httpClient.patch<IRecipe>(`${baseURL}${recipeUrl.recipes}/${id}`, formData)
  }

  getFilteredAndSorted(
    recipeCategoryId: number,
    title: string | null,
    nutrientId: number,
    pageNumber: number,
    pageSize: number
  ) {
    // важливо, шоб recipeCategoryId не мав елементів з id==0 (і в базі теж)
    if (recipeCategoryId == undefined) {
      recipeCategoryId = 0;
    }
    if (nutrientId == undefined) {
      nutrientId = 0;
    }
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/find-and-sort/${pageNumber}?nutrientId=${nutrientId}&categoryId=${recipeCategoryId}&title=${title}&pageSize=${pageSize}`)
  }

  rateRecipe(rank: string) {
    return this.httpClient.patch<IRecipe>(`${baseURL}${recipeUrl.recipes}/rate`, rank)
  }
}
