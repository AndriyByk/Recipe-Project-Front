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
export class RecipesCreatedResolver implements Resolve<IWrapperForRecipes> {

  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWrapperForRecipes> | Promise<IWrapperForRecipes> | IWrapperForRecipes {
    let pageSize = route.queryParams['pageSize'];
    if (!pageSize) {
      pageSize = 10;
    }

    return this.recipeService.getCreatedAll(
      route.queryParams['pageNumber'],
      pageSize,
      route.queryParams['userId']
    );
  }

}
