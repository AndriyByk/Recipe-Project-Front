import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminPageComponent
  ],
    imports: [
        CommonModule,
        AdminPageRoutingModule,
        ReactiveFormsModule
    ]
})
export class AdminPageModule { }
