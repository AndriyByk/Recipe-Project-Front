import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {IUser} from "../../../interfaces/entities/user/IUser";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UserByUsernameResolver implements Resolve<IUser> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> | Promise<IUser> | IUser {
    let username = localStorage.getItem("actualUser");
    if (!username) {
      username = "";
    }

    return this.userService.getByUsername(username);
  }
}
