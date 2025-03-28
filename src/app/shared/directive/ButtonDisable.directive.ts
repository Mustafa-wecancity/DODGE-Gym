import { Directive, HostListener, ElementRef } from '@angular/core';
import { take } from 'rxjs';
import { ButtonDisableService } from '../Api-Services/ButtonDisable.service';

@Directive({
  selector: '[appButtonDisable]',
  standalone: true,

})
export class ButtonDisableDirective {

  constructor(
    private buttonDisableService: ButtonDisableService,
    private elementRef: ElementRef<HTMLButtonElement>
  ) {
    
    this.buttonDisableService.getButtonState().subscribe((state) => {
      this.elementRef.nativeElement.disabled = state;
    });
  }
 
}
