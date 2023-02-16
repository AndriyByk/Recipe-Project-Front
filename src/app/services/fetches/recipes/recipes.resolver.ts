import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {RecipeService} from "./recipe.service";
import {IWrapperForRecipes} from "../../../interfaces/entities/recipe/IWrapperForRecipes";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<IWrapperForRecipes> {
  // private pageSize: number;
  // private pageInfo: IPageInfo;

  constructor(private recipeService: RecipeService) {
    // storeService.pageInfo.subscribe(value => this.pageInfo = value);
    // storeService.pageSize.subscribe(value => this.pageSize = value);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWrapperForRecipes> | Promise<IWrapperForRecipes> | IWrapperForRecipes {
    console.log("RecipesResolver")
    console.log(route.url);
    let pageNumber: number = +route.url[route.url.length-1].toString();
    if (isNaN(pageNumber)) {
      pageNumber = 0;
    }
    let pageSize = route.queryParams['pageSize'];
    if (!pageSize) {
      pageSize = 10;
    }
    return this.recipeService.getAll(pageNumber, pageSize);

  }
}
