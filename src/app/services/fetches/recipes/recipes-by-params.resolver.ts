import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {RecipeService} from "./recipe.service";
import {IWrapperForRecipes} from "../../../interfaces/entities/recipe/IWrapperForRecipes";

@Injectable({
  providedIn: 'root'
})
export class RecipesByParamsResolver implements Resolve<IWrapperForRecipes> {

  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWrapperForRecipes> | Promise<IWrapperForRecipes> | IWrapperForRecipes {
    console.log('RecipesByParamsResolver');
    let pageNumber: number = +(route.url[route.url.length-1].toString());
    if (isNaN(pageNumber)) {
      pageNumber = 0;
    }
    return this.recipeService.getFilteredAndSorted(
      route.queryParams['categoryId'],
      route.queryParams['title'],
      route.queryParams['nutrientId'],
      pageNumber,
      route.queryParams['pageSize']
    )
  }
}
