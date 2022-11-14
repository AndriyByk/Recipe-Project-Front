import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpPageRoutingModule } from './sign-up-page-routing.module';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicDateInputDirectiveDirective} from "../../directives/dynamic-date-input-directive.directive";


@NgModule({
  declarations: [
    SignUpPageComponent,
    DynamicDateInputDirectiveDirective
  ],
    imports: [
        CommonModule,
        SignUpPageRoutingModule,
        ReactiveFormsModule
    ]
})
export class SignUpPageModule { }
