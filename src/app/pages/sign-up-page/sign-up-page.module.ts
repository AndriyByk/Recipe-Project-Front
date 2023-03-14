import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignUpPageRoutingModule} from './sign-up-page-routing.module';
import {SignUpPageComponent} from './sign-up-page/sign-up-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DirectivesModule} from "../../directives/module/directives.module";


@NgModule({
  declarations: [
    SignUpPageComponent
  ],
  imports: [
    CommonModule,
    SignUpPageRoutingModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class SignUpPageModule {
}
