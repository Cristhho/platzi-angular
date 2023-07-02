import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  default = 'red'
  @Input()
  appHighlight = ''

  constructor(
    private element: ElementRef
  ) {
    element.nativeElement.style.backgroundColor = this.default
  }

  ngOnChanges(): void {
    this.element.nativeElement.style.backgroundColor = this.appHighlight || this.default
  }

}
