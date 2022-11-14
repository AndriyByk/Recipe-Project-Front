import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'input[dynamic-date-input]'
})
export class DynamicDateInputDirectiveDirective {

  private element : ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('focus')
  handleFocus() {
    this.element.nativeElement.type = 'date';
  }

  @HostListener('blur')
  handleBlur() {
    if(this.element.nativeElement.value == "") {
      this.element.nativeElement.type = 'text';
    }
  }
}
