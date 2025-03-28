import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDatePlaceholder]'
})
export class DatePlaceholderDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus') onFocus() {
    this.renderer.setAttribute(this.el.nativeElement, 'type', 'text');
    this.el.nativeElement.value = this.el.nativeElement.placeholder;
  }

  @HostListener('blur') onBlur() {
    if (!this.el.nativeElement.value) {
      this.renderer.setAttribute(this.el.nativeElement, 'type', 'date');
      this.el.nativeElement.value = '';
    }
  }

}
