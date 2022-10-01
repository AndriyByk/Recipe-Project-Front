import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoPageRoutingModule } from './user-info-page-routing.module';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";


@NgModule({
  declarations: [
    UserInfoPageComponent
  ],
  imports: [
    CommonModule,
    UserInfoPageRoutingModule
  ],
  providers: [
    UserByUsernameResolver
  ]
})
export class UserInfoPageModule { }
