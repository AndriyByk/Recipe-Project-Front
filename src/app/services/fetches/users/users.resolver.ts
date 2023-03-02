import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {IUser} from "../../../interfaces/entities/user/IUser";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<IUser[]> {


  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser[]> | Promise<IUser[]> | IUser[] {
    let pageNumber: number = +route.url[route.url.length-1].toString();
    if (isNaN(pageNumber)) {
      pageNumber = 0;
    }
    let pageSize = route.queryParams['pageSize'];
    if (!pageSize) {
      pageSize = 10;
    }

    let role = route.queryParams['role'];
    if (!role) {
      role = 100;
    }
    return this.userService.getChosen(
      pageNumber,
      pageSize,
      route.queryParams['username'],
      role);
  }


}
