import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPageRoutingModule } from './content-page-routing.module';
import { ContentPageComponent } from './content-page/content-page.component';
import {HeaderComponent} from "../../components/recipes/header/header.component";
import {RecipesPageModule} from "../recipes-page/recipes-page.module";


@NgModule({
  declarations: [
    ContentPageComponent,
    HeaderComponent
  ],
  exports: [
    ContentPageComponent
  ],
  imports: [
    CommonModule,
    ContentPageRoutingModule,
    RecipesPageModule
  ]
})
export class ContentPageModule { }
