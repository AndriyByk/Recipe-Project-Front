import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserInfoPageComponent} from "./user-info-page/user-info-page.component";
import {UserInfoUpdateComponent} from "../../components/cabinet/user-info-update/user-info-update.component";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";

const routes: Routes = [
  {
    path: '', component: UserInfoPageComponent, resolve: { user: UserByUsernameResolver }
  },
  {
    path: 'update', component: UserInfoUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoPageRoutingModule { }
