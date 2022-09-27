import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetPageRoutingModule } from './cabinet-page-routing.module';
import { CabinetPageComponent } from './cabinet-page/cabinet-page.component';
import {UserInfoUpdateComponent} from "../../components/cabinet/user-info-update/user-info-update.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CabinetPageComponent,
    UserInfoUpdateComponent
  ],
  imports: [
    CommonModule,
    CabinetPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class CabinetPageModule { }
