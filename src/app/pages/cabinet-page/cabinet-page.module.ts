import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetPageRoutingModule } from './cabinet-page-routing.module';
import { CabinetPageComponent } from './cabinet-page/cabinet-page.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CabinetPageComponent
  ],
  imports: [
    CommonModule,
    CabinetPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class CabinetPageModule { }
