import { CommonModule, isPlatformBrowser } from "@angular/common";
import {
  Component,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { ThemeOptionService } from "../../shared/services/theme-option.service";
import { ThemeState } from "../../shared/state/theme.state";
import { HomeServiceComponent } from "./home-service/home-service.component";
import { SeoV2Service } from "../../shared/services/seo-v2.service";
import { PublicService } from "../../shared/Api-Services/public.service";

@Component({
  selector: "app-themes",
  standalone: true,
  imports: [CommonModule, HomeServiceComponent],
  templateUrl: "./themes.component.html",
  styleUrls: ["./themes.component.scss"],
})
export class ThemesComponent implements OnDestroy {
  @Select(ThemeState.activeTheme) activeTheme$: Observable<string>;

  public theme: string;
  private queryParamsSubscription!: Subscription;
  public isBrowser: boolean;

  constructor(
    private renderer: Renderer2,
    private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.renderer.addClass(document.body, "home");
    }

    this.queryParamsSubscription = this.route.queryParams.subscribe(() => {
      this.themeOptionService.preloader = true;
    });

    this.seo();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    if (this.isBrowser) this.renderer.removeClass(document.body, "home");
  }

  private seo() {
    // this.seoV2Service.setMetaImage( '' );
     const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(translations.Home.header.Title);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaImageStatic("assets/images/pageList/Home.jpg");

      this.seoV2Service.setMetaDescription(
        translations.Home.header.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.Home.header.meta_description
        )
      );
      // this.seoService.setMetaTags(translations);
    });
  }
}
