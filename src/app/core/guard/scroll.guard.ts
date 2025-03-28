import { Injectable } from '@angular/core';
import { Event, Scroll, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';
import { BrowserOnlyService } from '../../shared/Api-Services/browser-only.service';

@Injectable({
  providedIn: 'root',
})
export class ScrollPositionGuard   {

  constructor(private viewportScroller: ViewportScroller, private router: Router,private browserOnlyService:BrowserOnlyService ) {}

  canActivate(): boolean {
  if(this.browserOnlyService.isBrowser()){

    this.router.events.pipe(filter((e: Event): e is Scroll => e instanceof Scroll))
    .subscribe((e) => {
      if (this.router.url.includes('collections') || this.router.url.includes('account')) {
        this.viewportScroller.scrollToPosition([150, 150]);
      } else {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
    return true;
  }
}
