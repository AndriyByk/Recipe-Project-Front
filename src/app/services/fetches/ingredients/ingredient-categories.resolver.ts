import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {IIngredientCategory} from "../../../interfaces/categories/IIngredientCategory";
import {IngredientCategoryService} from "./ingredient-category.service";

@Injectable({
  providedIn: 'root'
})
export class IngredientCategoriesResolver implements Resolve<IIngredientCategory[]> {

  constructor(private ingredientCategoryService: IngredientCategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIngredientCategory[]> | Promise<IIngredientCategory[]> | IIngredientCategory[] {
    return this.ingredientCategoryService.getAll();
  }
}
