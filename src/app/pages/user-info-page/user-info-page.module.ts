import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoPageRoutingModule } from './user-info-page-routing.module';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';


@NgModule({
  declarations: [
    UserInfoPageComponent
  ],
  imports: [
    CommonModule,
    UserInfoPageRoutingModule
  ]
})
export class UserInfoPageModule { }
