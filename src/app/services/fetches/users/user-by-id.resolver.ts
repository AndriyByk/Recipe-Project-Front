import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "./user.service";
import {IUserShort} from "../../../interfaces/entities/user/IUserShort";

@Injectable({
  providedIn: 'root'
})
export class UserByIdResolver implements Resolve<IUserShort> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserShort> | Promise<IUserShort> | IUserShort {
    let id:number = route.params['id'];
    return this.userService.getById(id);
  }
}
