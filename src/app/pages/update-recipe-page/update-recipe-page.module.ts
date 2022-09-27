import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRecipePageRoutingModule } from './update-recipe-page-routing.module';
import { UpdateRecipePageComponent } from './update-recipe-page/update-recipe-page.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UpdateRecipePageComponent
  ],
  imports: [
    CommonModule,
    UpdateRecipePageRoutingModule,
    ReactiveFormsModule
  ]
})
export class UpdateRecipePageModule { }
