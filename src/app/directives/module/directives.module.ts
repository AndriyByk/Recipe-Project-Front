import { NgModule } from '@angular/core';
import {AutoscrollDirective} from "../autoscroll.directive";
import {DynamicDateInputDirective} from "../dynamic-date-input.directive";
import {DynamicHeightDirective} from "../dynamic-height.directive";


@NgModule({
  declarations: [
    AutoscrollDirective,
    DynamicDateInputDirective,
    DynamicHeightDirective
  ],
  exports: [
    AutoscrollDirective,
    DynamicDateInputDirective,
    DynamicHeightDirective
  ]
})
export class DirectivesModule { }
