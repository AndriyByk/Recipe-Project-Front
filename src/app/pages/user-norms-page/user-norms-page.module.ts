import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserNormsPageRoutingModule } from './user-norms-page-routing.module';
import { UserNormsPageComponent } from './user-norms-page/user-norms-page.component';
import {UserByUsernameResolver} from "../../services/fetches/users/user-by-username.resolver";


@NgModule({
  declarations: [
    UserNormsPageComponent
  ],
  imports: [
    CommonModule,
    UserNormsPageRoutingModule
  ],
  providers: [
    UserByUsernameResolver
  ]
})
export class UserNormsPageModule { }
