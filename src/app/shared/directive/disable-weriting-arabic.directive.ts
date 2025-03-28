
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableWritingArabic]',
  standalone:true

})
export class DisableWeritingArabicDirective {


    @HostBinding('autocomplete') public autocomplete;

    constructor() {
      this.autocomplete = 'off';
    }

    @HostListener('keypress', ['$event'])
    @HostListener('paste', ['$event'])
    public disableKeys(e:KeyboardEvent) {
      const stringAllow = /^[-\sa-zA-Z,0-9\s\d\u200C-\u200F\u202A-\u202E!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]+$/;
      let inputChar = e.key;
      if (!stringAllow.test(inputChar)) {
        e.preventDefault();
      }
    }
  }
