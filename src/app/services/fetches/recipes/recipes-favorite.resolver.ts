import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {IWrapperForRecipes} from "../../../interfaces/entities/recipe/IWrapperForRecipes";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesFavoriteResolver implements Resolve<IWrapperForRecipes> {

  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWrapperForRecipes> | Promise<IWrapperForRecipes> | IWrapperForRecipes {
    // вхідна урла:
    // /cabinet/favorite-recipes/${pageNumber}?pageSize=${pageSize}&userId=${userId}
    // вихідна урла:
    // /recipes/favorite/${pageNumber}?pageSize=${pageSize}&userId=${userId}

    let pageNumber: number = +(route.url[route.url.length-1].toString());
    if (isNaN(pageNumber)) {
      pageNumber = 0;
    }

    return this.recipeService.getFavoriteFilteredAndSorted(
      route.queryParams['categoryId'],
      route.queryParams['title'],
      route.queryParams['nutrientId'],
      pageNumber,
      route.queryParams['pageSize'],
      route.queryParams['userId']
    );
  }

}
