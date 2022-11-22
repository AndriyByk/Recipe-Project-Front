import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserActivityTypeService} from "./user-activity-type.service";
import {IActivityType} from "../../../interfaces/categories/IActivityType";

@Injectable({
  providedIn: 'root'
})
export class UserActivityTypeResolver implements Resolve<IActivityType[]> {

  constructor(private userActivityTypeService : UserActivityTypeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IActivityType[]> | Promise<IActivityType[]> | IActivityType[] {
    return this.userActivityTypeService.getAll();
  }

}
