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
    storeService.pageInfo.subscribe(value => this.pageInfo = value);
    storeService.pageSize.subscribe(value => this.pageSize = value);
  }

  getAll(
    pageNumber: number,
    pageSize: number): Observable<IWrapperForRecipes> {
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/allRecipes/${pageNumber}?pageSize=${pageSize}`)
  }

  getAllInAdminMode(
    pageNumber: number,
    pageSize: number): Observable<IWrapperForRecipes> {
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/allRecipes/admin-mode/${pageNumber}?pageSize=${pageSize}&checked=undefined`)
  }

  getAllUncheckedInAdminMode(
    pageNumber: number,
    pageSize: number): Observable<IWrapperForRecipes> {
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/allRecipes/admin-mode/${pageNumber}?pageSize=${pageSize}&checked=false`)
  }

  getAllCheckedInAdminMode(
    pageNumber: number,
    pageSize: number): Observable<IWrapperForRecipes> {
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/allRecipes/admin-mode/${pageNumber}?pageSize=${pageSize}&checked=true`)
  }

  getCreatedAll(pageNumber: number,
                pageSize: number,
                userId: number): Observable<IWrapperForRecipes> {
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/created?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`)
  }

  getCreatedFilteredAndSorted(recipeCategoryId: number,
                              title: string | null,
                              nutrientId: number,
                              pageNumber: number,
                              pageSize: number,
                              userId: number) {
    if (recipeCategoryId == undefined) {
      recipeCategoryId = 0;
    }
    if (nutrientId == undefined) {
      nutrientId = 0;
    }
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/created/find-and-sort/${pageNumber}?nutrientId=${nutrientId}&categoryId=${recipeCategoryId}&title=${title}&pageSize=${pageSize}&userId=${userId}`)
  }

  getFavoriteAll(pageNumber: number,
                 pageSize: number,
                 userId: number): Observable<IWrapperForRecipes> {
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/favorite/${pageNumber}?pageSize=${pageSize}&userId=${userId}`)
  }

  getFavoriteFilteredAndSorted(recipeCategoryId: number,
                               title: string | null,
                               nutrientId: number,
                               pageNumber: number,
                               pageSize: number,
                               userId: number) {
    if (recipeCategoryId == undefined) {
      recipeCategoryId = 0;
    }
    if (nutrientId == undefined) {
      nutrientId = 0;
    }
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/favorite/find-and-sort/${pageNumber}?nutrientId=${nutrientId}&categoryId=${recipeCategoryId}&title=${title}&pageSize=${pageSize}&userId=${userId}`)

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

  getFilteredAndSortedInAdminMode(
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
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/find-and-sort/admin-mode/${pageNumber}?nutrientId=${nutrientId}&categoryId=${recipeCategoryId}&title=${title}&pageSize=${pageSize}`)
  }

  rateRecipe(rank: string) {
    return this.httpClient.patch<IRecipe>(`${baseURL}${recipeUrl.recipes}/rate`, rank)
  }

  changeStatus(recipeId: number) {
    return this.httpClient.patch<IRecipe>(`${baseURL}${recipeUrl.recipes}/change-status?recipeId=${recipeId}`, 'body')
  }
}
