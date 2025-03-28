import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { BrowserOnlyService } from '../Api-Services/browser-only.service';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public language = "en"
  public config = {
    langu: "en",
    settings: {
      layout: "Dubai",
      layout_type: "ltr",
      layout_version: "light-only",
      sidebar_type: "default-sidebar",
    },
    color: {
      primary_color: "#B78F4F",
      secondary_color: "#00263E",
    },
  };

  constructor( @Inject(PLATFORM_ID) private platformId: Object ) {

    if (typeof localStorage !== 'undefined') {
      let lan = localStorage.getItem('language');
      if (this.config.settings.layout_type == 'rtl' || lan == 'ar') {
        this.config.langu = lan ?? 'ar';
        this.config.settings.layout_type = 'rtl';
        this.handleClick(true);
      } else    this.handleClick(false)

    }else
    {
    this.handleClick(true)
    this.config.langu='ar'

    }

  }

  // async fun(): Promise<boolean> {
  //   return true;
  // }
  browserOnlyService = inject(BrowserOnlyService);


  async handleClick(lan:boolean) {
    if(this.browserOnlyService.isBrowser()){

    // const isPromise = await this.fun();
    if (typeof document !== "undefined")
    if (lan) {  // arabic

      if (typeof document.body.classList !== 'undefined'  ) {
        // access the classList property
        document.body.classList.remove('ltr')
        document.body.classList.add('rtl')
      } else {
        console.error('classList is not defined');
      }
    } else {
      if (typeof document.body.classList !== 'undefined'  ) {
        // access the classList property
        document.body.classList.remove('rtl')
        document.body.classList.add('ltr')
      } else {
        console.error('classList is not defined');
      }
    }

    if (typeof document !== "undefined"){
    document
      .getElementsByTagName("html")[0].setAttribute("lang", this.config.langu);
    document.getElementsByTagName("html")[0]
      .setAttribute("dir", this.config.settings.layout_type);

    document.documentElement.style.setProperty(
      "--theme-deafult",
      this.config.color.primary_color
    );
    document.documentElement.style.setProperty(
      "--theme-secondary",
      this.config.color.secondary_color
    );
  }

    }}
 
  reloadPage() {
    if (this.browserOnlyService.isBrowser()) 
    window.location.reload();
  }
}
