import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRecipePageRoutingModule } from './add-recipe-page-routing.module';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AddRecipePageComponent
  ],
    imports: [
        CommonModule,
        AddRecipePageRoutingModule,
        ReactiveFormsModule
    ]
})
export class AddRecipePageModule { }
