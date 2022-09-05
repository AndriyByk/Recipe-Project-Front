import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInPageRoutingModule } from './sign-in-page-routing.module';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SignInPageComponent
  ],
    imports: [
        CommonModule,
        SignInPageRoutingModule,
        ReactiveFormsModule
    ]
})
export class SignInPageModule { }
