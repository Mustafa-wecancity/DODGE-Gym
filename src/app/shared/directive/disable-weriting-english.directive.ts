// import { Directive, HostBinding, HostListener } from '@angular/core';

// @Directive({
//   selector: '[appDisableWritingArabic]',
//   standalone:true
// })
// export class DisableWritingArabicDirective {
//   @HostBinding('autocomplete') public autocomplete;

//   constructor() {
//     this.autocomplete = 'off';
//   }

//   @HostListener('keypress', ['$event']) public disableKeys(e:KeyboardEvent) {
//     const stringAllow = /^[-\s,\u0600-\u06FF,0-9]+$/;
//     let inputChar = e.key;
//     if (!stringAllow.test(inputChar)) {
//       e.preventDefault();
//     }

//   }
// }

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableWritingEnglish]',
  standalone: true
})
export class DisableWritingEnglishDirective {
  @HostBinding('autocomplete') public autocomplete;

  constructor() {
    this.autocomplete = 'off';
  }

  @HostListener('keypress', ['$event'])
  @HostListener('paste', ['$event'])
  public disableKeys(e: KeyboardEvent) {
    const stringAllow = /^[\u0600-\u06FF,0-9\s\d\u200C-\u200F\u202A-\u202E!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]+$/;
    let inputChar = e.key;
    if (!stringAllow.test(inputChar)) {
      e.preventDefault();
    }
  }
}
