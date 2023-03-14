import {AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {delay, distinct, filter, first, Subject} from "rxjs";

@Directive({
  selector: '[appAutofocus]',
})
export class AutoscrollDirective implements AfterViewInit, OnInit, OnDestroy, OnChanges  {
  @Input()
  isScroll: boolean | undefined;
  @Input()
  delayMS: number | undefined;
  private doScrollStream = new Subject();

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.doScroll();
  }

  ngOnChanges(): void {
    this.doScroll();
  }

  ngOnDestroy(): void {  }

  ngOnInit(): void {
    this.doScrollStream
      .pipe(
        distinct(),
        filter(Boolean),
        delay(this.delayMS || 0),
        first()
      )
      .subscribe(() => {
        this.directScroll();
      });
  }

  directScroll() {
    window.scroll({
      top: this.elementRef.nativeElement.offsetTop,
      behavior: 'auto'
    });
  }

  doScroll() {
    this.doScrollStream.next(this.isScroll);
  }
}
