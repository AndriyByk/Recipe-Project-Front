import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoUpdatePageRoutingModule } from './user-info-update-page-routing.module';
import { UserInfoUpdatePageComponent } from './user-info-update-page/user-info-update-page.component';
import {UserActivityTypeResolver} from "../../services/fetches/users/user-activity-type.resolver";
import {UserGenderResolver} from "../../services/fetches/users/user-gender.resolver";
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserInfoUpdatePageComponent
  ],
  imports: [
    CommonModule,
    UserInfoUpdatePageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserActivityTypeResolver,
    UserGenderResolver,
    UserByUsernameResolver
  ]
})
export class UserInfoUpdatePageModule { }
