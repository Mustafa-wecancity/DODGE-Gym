import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbersWithDouble]',
  standalone: true
})
export class OnlyNumbersWithDoubleDirective {



  @HostBinding('autocomplete') public autocomplete;

  // constructor() {
  //   this.autocomplete = 'off';
  // }

//   @HostListener('keypress', ['$event']) public disableKeys(e: KeyboardEvent) {
//     const keyCode = e.keyCode
//     // Allow backspace, enter, and dot (.)
//     if (keyCode === 8 || keyCode === 13 || keyCode === 46) {
//       return true;
//     }

//     // Allow only numbers
//     return (e.keyCode == 8 ||e.keyCode == 13|| (e.keyCode >= 48 && e.keyCode <= 57));
// }



// }
constructor(private el: ElementRef) {
  this.autocomplete = 'off';
}

@HostListener('keypress', ['$event'])
@HostListener('paste', ['$event'])

public disableKeys(e: KeyboardEvent) {

  const keyCode = e.keyCode
  const inputElement = this.el.nativeElement as HTMLInputElement;
  const inputValue = inputElement.value;

  // Allow backspace, enter, and dot (.)
  if (keyCode === 8 || keyCode === 13 || keyCode === 46) {
    return true;
  }

  // Check if the input starts with zero and the key pressed is not dot
  if (inputValue == "" &&  keyCode == 48) {
    return false;
  }

  // Allow only numbers
  return (e.keyCode == 8 ||e.keyCode == 13|| (e.keyCode >= 48 && e.keyCode <= 57));
}
}
