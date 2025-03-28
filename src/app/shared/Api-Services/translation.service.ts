import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router } from '@angular/router';

const LANG_KEY = makeStateKey<string>('LANGUAGE');

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang: string = 'en';
  localeEvent = new Subject<string>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    private translate: TranslateService,
    private router: Router
  ) {
    if (isPlatformBrowser(platformId)) {
      this.currentLang = localStorage.getItem('language') || this.transferState.get(LANG_KEY, this.translate.getDefaultLang());
      this.translate.use(this.currentLang);
    }
  }

  /**
   * Change language
   */

  changeLang(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = localStorage.getItem('language')??'ar';
      if (this.currentLang !== lang) {
        localStorage.setItem('language', lang);
        window.location.reload();
        window?.scrollTo(0, 0);
      }
        //  let direction =
        //  this.currentLang == "ar"
        //     ? "rtl"
        //     : "ltr";
        // document.documentElement.dir = direction;
        // document.documentElement.lang = this.currentLang;
      // setTimeout(() => {
      //   this.translate.use(lang);
      //   this.localeEvent.next(lang);

      //   let direction =
      //     localStorage.getItem('language') === "ar"
      //       ? "rtl"
      //       : "ltr";
      //   document.documentElement.dir = direction;
      //   document.documentElement.lang = this.currentLang;

      //   let getMain = document.getElementsByTagName("html")[0];
      //   getMain.setAttribute("lang", this.currentLang);
      //   getMain.setAttribute("class", this.currentLang);
      // }, 500);
    }
  }


  /**
   * Returns selected language
   */
  getSelectedLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('language') || this.translate.getDefaultLang();
    }
    return this.currentLang;
  }
}
