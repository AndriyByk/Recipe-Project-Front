import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserNormsPageRoutingModule } from './user-norms-page-routing.module';
import { UserNormsPageComponent } from './user-norms-page/user-norms-page.component';


@NgModule({
  declarations: [
    UserNormsPageComponent
  ],
  imports: [
    CommonModule,
    UserNormsPageRoutingModule
  ]
})
export class UserNormsPageModule { }
