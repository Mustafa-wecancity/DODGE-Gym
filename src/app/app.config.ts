import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { RouterModule, provideRouter } from "@angular/router";

import { CurrencyPipe } from "@angular/common";
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxsModule } from "@ngxs/store";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ToastrModule } from "ngx-toastr";
import { routes } from "./app.routes";
import { ErrorService } from "./shared/services/error.service";
import { NotificationService } from "./shared/services/notification.service";
import { AccountState } from "./shared/state/account.state";
import { AttributeState } from "./shared/state/attribute.state";
import { AuthState } from "./shared/state/auth.state";
import { BlogState } from "./shared/state/blog.state";
import { BrandState } from "./shared/state/brand.state";
import { CompareState } from "./shared/state/compare.state";
import { CountryState } from "./shared/state/country.state";
import { CouponState } from "./shared/state/coupon.state";
import { CurrencyState } from "./shared/state/currency.state";
import { DownloadState } from "./shared/state/download.state";
import { LoaderState } from "./shared/state/loader.state";
import { NotificationState } from "./shared/state/notification.state";

import { PageState } from "./shared/state/page.state";
import { PaymentDetailsState } from "./shared/state/payment-details.state";
import { ReviewState } from "./shared/state/review.state";
import { SettingState } from "./shared/state/setting.state";
import { StateState } from "./shared/state/state.state";
import { StoreState } from "./shared/state/store.state";
import { SubscriptionState } from "./shared/state/subscription.state";
import { TagState } from "./shared/state/tag.state";
import { ThemeOptionState } from "./shared/state/theme-option.state";
import { ThemeState } from "./shared/state/theme.state";
import { GenericService } from "./shared/Api-Services/generic.service";
import { errorInterceptor } from "./core/interceptors/interceptor/error.interceptor";
import { headerInterceptor } from "./core/interceptors/interceptor/header.interceptor";
import { environment } from "../environments/environment.development";
import { ButtonDisableService } from "./shared/Api-Services/ButtonDisable.service";

// AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
// }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    environment.langJson + "/",
    "/Translations/GetTranslationFile/webdepoint"
  );
}

// export function HttpLoaderFactory(http: HttpClient) {
//   const lang = inject(PublicService).getCurrentLanguage() || 'ar';
//   console.log(environment.langJson)
//   console.log(lang)
//   return new TranslateHttpLoader(
//     http,
//     `${environment.langJson}/${lang}/`,
//     "Translations/GetTranslationFile/webddepoint"
//   );
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),

    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([headerInterceptor, errorInterceptor])),
    GenericService,
    CurrencyPipe,
    ErrorService,

    // SeoService,

    ButtonDisableService,
    NotificationService,
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      CarouselModule,
      LoadingBarRouterModule,
      ToastrModule.forRoot({
        positionClass: "toast-top-center",
        preventDuplicates: true,
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),

      NgxsModule.forRoot([
        LoaderState,
        AccountState,
        CountryState,
        StateState,
        SettingState,
        CurrencyState,
        ThemeState,
        ThemeOptionState,
        PageState,
        AttributeState,
        StoreState,

        BlogState,
        TagState,
        CompareState,

        PaymentDetailsState,
        NotificationState,
        ReviewState,
        CouponState,
        SubscriptionState,
        BrandState,
        DownloadState,
      ]),
      NgxsModule.forFeature([AuthState]),
      RouterModule.forRoot(routes, {
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      })
    ),
  ],
};
