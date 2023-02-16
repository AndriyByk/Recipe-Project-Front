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
export class RecipesByNutrientIdResolver implements Resolve<IWrapperForRecipes> {

  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWrapperForRecipes> | Promise<IWrapperForRecipes> | IWrapperForRecipes {
    let pageNumber: number = +route.url[route.url.length-1].toString();
    if (isNaN(pageNumber)) {
      pageNumber = 0;
    }
    return this.recipeService.getSortedByNutrient(
      pageNumber,
      route.queryParams['pageSize'],
      route.queryParams['nutrientId']);
  }
}
