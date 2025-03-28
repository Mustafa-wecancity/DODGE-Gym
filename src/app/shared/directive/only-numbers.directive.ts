import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[onlyNumbers]",
  standalone: true,
})
export class OnlyNumbersDirective {
  @HostBinding("autocomplete") public autocomplete;

  constructor() {
    this.autocomplete = "off";
  }

  @HostListener("keypress", ["$event"])
  // @HostListener('paste', ['$event'])
  public disableKeys(e: KeyboardEvent) {
    document.all ? e.keyCode : e.keyCode;

    // let y = this.x.test( e.keyCode)
    return (
      e.keyCode == 8 || e.keyCode == 13 || (e.keyCode >= 48 && e.keyCode <= 57)
    );
  }
}
