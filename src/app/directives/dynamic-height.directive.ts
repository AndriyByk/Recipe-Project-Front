import {AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2} from '@angular/core';
import {debounceTime, fromEvent, Subscription, throttleTime} from 'rxjs';

@Directive({
  selector: '[appDynamicHeight]'
})
export class DynamicHeightDirective implements AfterViewInit, OnDestroy {
  private readonly domElement: HTMLElement;
  private resizeSub: Subscription;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
    this.domElement = this.elementRef.nativeElement as HTMLElement;
    this.resizeSub = fromEvent(window, 'resize')
      .pipe(throttleTime(500), debounceTime(500))
      .subscribe(() => this.setHeight());
  }

  ngAfterViewInit(): void {
    this.setHeight();
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }

  setHeight() {
    let listOfRecipes = window.document.getElementsByClassName('recipe');
    let ourHeight : number;
    let sum: number = 0;
    if (listOfRecipes.length > 1) {
      sum = this.calcHeightOfRecipesInOneColumn(listOfRecipes);
      // console.log(sum);
      ourHeight = this.calcHeightOfRecipesInTwoColumns(sum, listOfRecipes);
    } else {
      ourHeight = this.calcHeightOfRecipesInOneColumn(listOfRecipes);
    }
    this.renderer.setStyle(this.domElement.parentElement, 'max-height', `${ourHeight}px`)
  }

  calcHeightOfRecipesInOneColumn(elements: HTMLCollectionOf<Element>): number {
    let sum: number = 0;
    for (let i = 0; i < elements.length; i++) {
      let height = elements[i].getBoundingClientRect().height;
      sum = sum + +height + 15;
    }
    return sum;
  }

  calcHeightOfRecipesInTwoColumns(sum: number, elements: HTMLCollectionOf<Element>) {
    let maxHeight: number;
    let heightFromStart = 0;
    let heightFromEnd = 0;
    for (let i = 0, j = elements.length - 1 ;;) {
      if (i == 0) {
        heightFromStart = heightFromStart + elements[i].getBoundingClientRect().height + 10;
        i++;
        heightFromEnd = heightFromEnd + elements[j].getBoundingClientRect().height + 10;
        j--;
      } else {
        if (heightFromStart < heightFromEnd) {
          heightFromStart = heightFromStart + elements[i].getBoundingClientRect().height + 10;
          // console.log(i + " == start == " + heightFromStart)
          if (i==j) {
            maxHeight = Math.max(heightFromStart, heightFromEnd)
            break;
          }
          i++;
        } else {
          heightFromEnd = heightFromEnd + elements[j].getBoundingClientRect().height + 10;
          // console.log(j + " -----end------ " + heightFromEnd)
          if (i==j) {
            maxHeight = Math.max(heightFromStart, heightFromEnd)
            break;
          }
          j--;
        }
      }
    }
    return maxHeight;
  }
}
