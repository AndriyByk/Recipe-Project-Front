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
export class UserByIdResolver implements Resolve<IUser> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> | Promise<IUser> | IUser {
    let id:number = route.params['id'];
    return this.userService.getById(id);
  }

}
