import { Component, HostListener, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { BrowserOnlyService } from '../../../Api-Services/browser-only.service';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {

  public show: boolean;

  constructor(private viewScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if(isPlatformBrowser(this.platformId)){
      let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (number > 600) { 
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
  browserOnlyService = inject(BrowserOnlyService);


  tapToTop() {
    if(this.browserOnlyService.isBrowser()){
      
      this.viewScroller.scrollToPosition([0, 0]);
    }
  }

}
