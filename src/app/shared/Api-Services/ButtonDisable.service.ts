import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ButtonDisableService {
  private requestCount = 0;
  public buttonState = new BehaviorSubject<boolean>(false);
constructor() {}

 getButtonState() {
  return this.buttonState.asObservable();
}

DisableBtns() {
  this.requestCount++;
  this.buttonState.next(true);
}

UnDisableBtns() {
  if (this.requestCount > 0) {
    this.requestCount--;
  }

  if (this.requestCount === 0) {
    this.buttonState.next(false);
  }
}

}
