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

    let sum: number = this.calcHeightOfRecipesInOneColumn(listOfRecipes);
    let halfSum: number = sum / 2;
    let ourHeight = this.calcHeightOfRecipesInTwoColumns(halfSum, listOfRecipes);
    this.renderer.setStyle(this.domElement.parentElement, 'max-height', `${ourHeight}px`)
  }

  calcHeightOfRecipesInOneColumn(elements: HTMLCollectionOf<Element>): number {
    let sum: number = 0;
    for (let i = 0; i < elements.length; i++) {
      let height = elements[i].getBoundingClientRect().height;
      sum = sum + +height + 10;
    }
    return sum;
  }

  calcHeightOfRecipesInTwoColumns(halfSum: number, elements: HTMLCollectionOf<Element>) {
    let maxHeight = 0;
    let heightFirst: number = 0;
    let heightSecond: number = 0;
    let j: number = 0;
    do {
      let heightOfElementFirst = elements[j].getBoundingClientRect().height + 10;
      heightFirst = heightFirst + heightOfElementFirst;
      j++;
      if (heightFirst >= halfSum) {
        let k = j;
        do {
          let heightOfElementSecond = elements[k].getBoundingClientRect().height;
          heightSecond = heightSecond + heightOfElementSecond;
          k++;
        } while (heightSecond < halfSum && k < elements.length)

        maxHeight = Math.max(heightFirst, heightSecond)
        break;

      }
    } while (heightFirst < halfSum)
    return maxHeight;
  }
}
