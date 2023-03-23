import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForbiddenPageRoutingModule } from './forbidden-page-routing.module';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';


@NgModule({
  declarations: [
    ForbiddenPageComponent
  ],
  imports: [
    CommonModule,
    ForbiddenPageRoutingModule
  ]
})
export class ForbiddenPageModule { }
