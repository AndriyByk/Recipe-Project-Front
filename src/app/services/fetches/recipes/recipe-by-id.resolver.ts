import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {IRecipe} from "../../../interfaces/entities/recipe/IRecipe";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeByIdResolver implements Resolve<IRecipe> {


  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipe> | Promise<IRecipe> | IRecipe {
    console.log(route.params['id'])

    return this.recipeService.getById(route.params['id']);

  }

}
