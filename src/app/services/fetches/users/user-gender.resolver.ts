import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {IGender} from "../../../interfaces/categories/IGender";
import {UserGenderService} from "./user-gender.service";

@Injectable({
  providedIn: 'root'
})
export class UserGenderResolver implements Resolve<IGender[]> {

  constructor(private userGenderService: UserGenderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGender[]> | Promise<IGender[]> | IGender[] {
    return this.userGenderService.getAll();
  }


}
