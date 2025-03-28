import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[data-collapse-toggle]'
})
export class CollapseToggleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  @HostListener('paste', ['$event'])

  onClick(event: Event) {
    // Implement the behavior you want when the button is clicked.
    // You can access the element using this.el.nativeElement.
    // For example, you can toggle a CSS class or trigger a collapse effect.
  }
}
