import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSuperPageRoutingModule } from './admin-super-page-routing.module';
import { AdminSuperPageComponent } from './admin-super-page/admin-super-page.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminSuperPageComponent
  ],
    imports: [
        CommonModule,
        AdminSuperPageRoutingModule,
        ReactiveFormsModule
    ]
})
export class AdminSuperPageModule { }
