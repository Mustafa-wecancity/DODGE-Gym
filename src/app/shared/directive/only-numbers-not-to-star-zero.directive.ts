import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appOnlyNumbersNotToStarZero]',
  standalone: true,
})
export class OnlyNumbersNotToStarZeroDirective {
  @HostBinding('autocomplete') public autocomplete;

  constructor(private el: ElementRef) {
    this.autocomplete = 'off';
  }

  @HostListener('keypress', ['$event'])
  @HostListener('paste', ['$event'])
  public disableKeys(e: KeyboardEvent) {
    const keyCode = e.keyCode;
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;

    // Check if the input starts with zero and the key pressed is not dot
    if (inputValue == '' && keyCode == 48) {
      return false;
    }

    // let y = this.x.test( e.keyCode)
    return keyCode == 8 || keyCode == 13 || (keyCode >= 48 && keyCode <= 57);
  }
}
