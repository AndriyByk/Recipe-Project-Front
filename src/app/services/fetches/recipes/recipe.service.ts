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

  // +pagination
  // pageSize: number, pageNumber: number
  // getAll(): Observable<IRecipe[]> {
  //   return this.httpClient.get<IRecipe[]>(`${baseURL}${recipeUrl.recipes}?pageSize=10&pageNumber=0`)
  // }


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

  // +pagination
  getFiltered(
    recipeCategoryId: number,
    title: string | null,
    pageNumber: number,
    pageSize: number
  ): Observable<IWrapperForRecipes> {
    // важливо, шоб recipeCategoryId не мав елементів з id==0
    if (recipeCategoryId != null && recipeCategoryId != 0) {
      if (title != null) {
        console.log("recipeCategoryId != null ======== title != null")
        return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/find/${pageNumber}?categoryId=${recipeCategoryId}&title=${title}&pageSize=${pageSize}`);
      } else {
        console.log("recipeCategoryId != null ======== title == null")
        return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/find/${pageNumber}?categoryId=${recipeCategoryId}&pageSize=${pageSize}`);
      }
    } else {
      if (title != null) {
        console.log("recipeCategoryId == null ======== title != null")
        return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/find/${pageNumber}?title=${title}&pageSize=${pageSize}`);
      } else {
        console.log("recipeCategoryId == null ======== title == null")
        // треба змінити, щоб взагалі не робило за таких умов запиту
        return this.getAll(pageSize, pageNumber);
      }
    }
  }

  // +pagination
  getSortedByNutrient(
    pageNumber: number,
    pageSize: number,
    nutrientId: number): Observable<IWrapperForRecipes> {
    return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/find-by-nutrient/${pageNumber}?nutrientId=${nutrientId}&pageSize=${pageSize}`)
  }

  getFilteredAndSorted(
    recipeCategoryId: number,
    title: string | null,
    nutrientId: number,
    pageNumber: number,
    pageSize: number
  ) {
    // if (recipeCategoryId != null && recipeCategoryId != 0) {
    //   if (title != null) {
    //     console.log("recipeCategoryId != null ======== title != null")
    //     if ()
    //     return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/find/${pageNumber}?categoryId=${recipeCategoryId}&title=${title}&pageSize=${pageSize}`);
    //   } else {
    //     console.log("recipeCategoryId != null ======== title == null")
    //     return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/find/${pageNumber}?categoryId=${recipeCategoryId}&pageSize=${pageSize}`);
    //   }
    // } else {
    //   if (title != null) {
    //     console.log("recipeCategoryId == null ======== title != null")
    //     return this.httpClient.get<IWrapperForRecipes>(`${baseURL}${recipeUrl.recipes}/find/${pageNumber}?title=${title}&pageSize=${pageSize}`);
    //   } else {
    //     console.log("recipeCategoryId == null ======== title == null")
    //     // треба змінити, щоб взагалі не робило за таких умов запиту
    //     return this.getAll(pageSize, pageNumber);
    //   }
    // }

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
