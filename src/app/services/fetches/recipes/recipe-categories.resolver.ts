import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {IRecipeCategory} from "../../../interfaces/categories/IRecipeCategory";
import {RecipeCategoryService} from "./recipe-category.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeCategoriesResolver implements Resolve<IRecipeCategory[]> {

  constructor(private recipeCategoryService: RecipeCategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipeCategory[]> | Promise<IRecipeCategory[]> | IRecipeCategory[] {
    return this.recipeCategoryService.getAll();
  }

}
