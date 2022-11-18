import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {IIngredient} from "../../../interfaces/entities/ingredient/IIngredient";
import {IngredientService} from "./ingredient.service";

@Injectable({
  providedIn: 'root'
})
export class IngredientsResolver implements Resolve<IIngredient[]> {

  constructor(private ingredientService: IngredientService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIngredient[]> | Promise<IIngredient[]> | IIngredient[] {
    return this.ingredientService.getAll();
  }

}
