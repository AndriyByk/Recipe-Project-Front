import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserInfoUpdatePageComponent} from "./user-info-update-page/user-info-update-page.component";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";
import {UserActivityTypeResolver} from "../../services/fetches/users/user-activity-type.resolver";
import {UserGenderResolver} from "../../services/fetches/users/user-gender.resolver";

const routes: Routes = [
  {
    path: '', component: UserInfoUpdatePageComponent, resolve: {
      user: UserByUsernameResolver,
      types: UserActivityTypeResolver,
      genders: UserGenderResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoUpdatePageRoutingModule { }
