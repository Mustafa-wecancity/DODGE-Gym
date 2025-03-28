import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer,
} from "@angular/common";
import { Component, Inject, PLATFORM_ID, Renderer2 } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from "@angular/router";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { Actions, Select, Store } from "@ngxs/store";
import {  Observable } from "rxjs";
import { GetThemeOption } from "./shared/action/theme-option.action";
import { GetThemes } from "./shared/action/theme.action";
import {  Values } from "./shared/interface/setting.interface";
import { Option } from "./shared/interface/theme-option.interface";
import { SettingState } from "./shared/state/setting.state";
import { ThemeOptionState } from "./shared/state/theme-option.state";
import { TranslateService } from "@ngx-translate/core";
import { EnvironmentService } from "./shared/Layout/environment.service";
import { SeoV2Service } from "./shared/services/seo-v2.service";
import { LayoutService } from "./shared/Layout/layout.service";
import { PublicService } from "./shared/Api-Services/public.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  languages = ["en", "ar"]; // List of supported languages
  currentLanguage: string | null = null;
  loading!: Observable<boolean>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  loder: boolean = false;
  public favIcon: HTMLLinkElement | null;
  public isTabInFocus = true;
  public isBrowser: boolean;
  public isDocument: boolean;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private environmentService: EnvironmentService,
    private SeoV2Service: SeoV2Service,
    private layoutService: LayoutService,

    config: NgbRatingConfig,
    private router: Router,
    private store: Store,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,

    private renderer: Renderer2,

    @Inject(PLATFORM_ID) private platformId: Object,
    private publicService: PublicService // public seoService: SeoService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isDocument = isPlatformBrowser(document);
    this.SeoV2Service.updateDefaultSeo();
    config.max = 5;
    config.readonly = true;

    if ( this.isBrowser ) {
      this.initializeApp();
      this.publicService.updateUrl.subscribe((res: any) => {
        if (res) {
          this.checkAndSetLanguageInUrl();
        }
      });
    }

    this.store.dispatch(new GetThemeOption());
    this.store.dispatch(new GetThemes());
    if (this.isBrowser) {
      this.loading = this.publicService.isLoading;
    }
  }

  platform: "Browser" | "Server" | "Unknown" = "Unknown";

  private initializeApp(): void {
    
    this.loder = true;
    setTimeout(() => (this.loder = false), 250);

    if ( this.isBrowser ) {
      this.checkAndSetLanguageInUrl(); // Ensure language is part of the URL on app load
      // this.initBrowserFeatures();
    } else if (isPlatformServer(this.platformId)) {
      this.platform = "Server";
    }

    this.events();
    // this.subscribeToRouterEvents();
    this.setupLanguageSupport();
  }
  private checkAndSetLanguageInUrl(): void {
    if (! this.isBrowser ) return;
    const currentUrl = this.router.url;
    let urlSegments = currentUrl.split("/");
 
    if (this.languages.includes(urlSegments[1])) {
      console.log(
        `First segment contains a supported language: ${urlSegments[1]}`
      );
    }

    // Remove any existing language code (if present) from stored URL
    let storedUrl: any = "";
    if (storedUrl === "") {
      storedUrl = currentUrl;
    } else {
      if (storedUrl) {
        let storedUrlSegments = storedUrl.split("/");
        // If the stored URL contains a language code, remove it
        if (this.languages.includes(storedUrlSegments[1])) {
          storedUrlSegments.splice(1, 1); // Remove the language from the URL
        }
        // Update the `storedUrl` in localStorage without the language code
        sessionStorage.setItem("storedUrl", storedUrlSegments.join("/"));
        // Ensure `urlSegments` reflects the correct state if storedUrl was loaded initially
        urlSegments = storedUrlSegments;
      }
      // Check if the first segment is a valid language
      const languageFromUrl = urlSegments[1]; // Check after base URL
      if (!this.languages.includes(languageFromUrl)) {
        // If the language code is missing, add the default or browser language
        this.currentLanguage =
          this.getLanguageFromLocalStorage() ||
          this.translateService.getBrowserLang() ||
          "en";
        // Insert the correct language at the beginning of the URL and ensure it is followed by a `/`
        urlSegments.splice(1, 0, this.currentLanguage);
        // Update the `storedUrl` in localStorage
        const newUrl = urlSegments.join("/");
        sessionStorage.setItem("storedUrl", newUrl);
        // Navigate to the new URL but without reloading the page
        this.router.navigateByUrl(newUrl);
      } else {
        // If a valid language is found in the URL, use it
        this.currentLanguage = languageFromUrl;
        this.applyLanguage(this.currentLanguage);
        // Ensure the current URL is stored without duplicate languages
        sessionStorage.setItem("storedUrl", currentUrl);
      }
    }
  }

  private setupLanguageSupport(): void {
    this.translateService.addLangs(this.languages);
    this.currentLanguage = this.getLanguageFromLocalStorage();

    if (this.currentLanguage) {
      this.applyLanguage(this.currentLanguage);
    } else {
      this.applyBrowserLanguage();
    }
  }
  private browserLang: string | null;
  private applyBrowserLanguage(): void {
    if ( this.isBrowser ) {
      this.browserLang = this.translateService.getBrowserLang() ?? "ar";
      if (this.browserLang) {
        localStorage.setItem("language", this.browserLang);
        this.translateService.use(this.browserLang);
        this.translateService.setDefaultLang(this.browserLang);
        // window.location.reload();
      }
    }
  }
  private getLanguageFromLocalStorage(): string | null {
    return  this.isBrowser 
      ? localStorage.getItem("language")
      : null;
  }

  private applyLanguage(lang: string): void {
    this.translateService.use(lang);
    this.setLanguageDirection(lang === "ar" ? "rtl" : "ltr");
    // this.translateService.stream('primeng').subscribe(data => this.primengConfig.setTranslation(data));
  }

  private setLanguageDirection(direction: "rtl" | "ltr"): void {
    if ( this.isBrowser ) {
      // Set attributes on the <html> element
      this.renderer.setAttribute(
        this.document.documentElement,
        "dir",
        direction
      );
      this.renderer.setAttribute(
        this.document.documentElement,
        "lang",
        this.currentLanguage || ""
      );
      this.renderer.setAttribute(
        this.document.documentElement,
        "class",
        this.currentLanguage || ""
      );

      // Update body classes for RTL or LTR
      if (direction === "rtl") {
        document.body.classList.remove("ltr");
        document.body.classList.add("rtl");
      } else {
        document.body.classList.remove("rtl");
        document.body.classList.add("ltr");
      }

      // Explicitly set the lang attribute on the <html> element
      document
        .getElementsByTagName("html")[0]
        .setAttribute("lang", this.currentLanguage || "");
    }
  }
 
  // private subscribeToRouterEvents(): void {
  //   this.router.events
  //     .pipe(
  //       filter(
  //         (event) =>
  //           event instanceof NavigationStart || event instanceof NavigationEnd
  //       ),
  //       map((event) => {
  //         if (event instanceof NavigationStart) {
  //           // Handle NavigationStart event
  //           this.SeoV2Service.setHostUrlIndex(event);
  //           return null; // Skip further processing for NavigationStart
  //         }

  //         if (event instanceof NavigationEnd) {
  //           // Handle NavigationEnd event
  //           let child = this.activatedRoute?.firstChild;
  //           while (child) {
  //             if (child.firstChild) {
  //               child = child.firstChild;
  //             } else if (child.snapshot?.data) {
  //               return child.snapshot.data;
  //             } else {
  //               return null;
  //             }
  //           }
  //           return null;
  //         }
  //       })
  //     )
  //     .subscribe((data: any) => {
  //       if (data) {
  //         this.publicService.pushUrlData.next(data);
  //         const currentUrl = this.router.url;
  //         if ( this.isBrowser ) {
  //           sessionStorage.setItem("storedUrl", currentUrl);
  //           this.checkAndSetLanguageInUrl();
  //         }
  //       }
  //     });
  // }
  private events() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.SeoV2Service.setHostUrlIndex(event);
      }
    });
  }

 
}
