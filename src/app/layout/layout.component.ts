import {
  Component,
  inject,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { Store, Select } from "@ngxs/store";
import { Observable, Subscription, forkJoin } from "rxjs";
import { ThemeOptionState } from "../shared/state/theme-option.state";
import { Option } from "../shared/interface/theme-option.interface";
import { GetCategories } from "../shared/action/category.action";
import { GetPages } from "../shared/action/page.action";
import { ThemeOptionService } from "../shared/services/theme-option.service";
import { GetBlogs } from "../shared/action/blog.action";
import {
  GetDealProducts,
  GetProductBySearch,
} from "../shared/action/product.action";
import { GetMenu } from "../shared/action/menu.action";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from "@angular/router";
import { GetWishlist } from "../shared/action/wishlist.action";
import { UpdateProductBox } from "../shared/action/theme-option.action";
import { HeaderComponent } from "../shared/components/header/header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { LoaderComponent } from "../shared/components/widgets/loader/loader.component";
import { StickyCompareComponent } from "../shared/components/widgets/sticky-compare/sticky-compare.component";
import { ThemeCustomizerComponent } from "../shared/components/widgets/theme-customizer/theme-customizer.component";
import { BackToTopComponent } from "../shared/components/widgets/back-to-top/back-to-top.component";
import { NewsletterModalComponent } from "../shared/components/widgets/modal/newsletter-modal/newsletter-modal.component";
import { ExitModalComponent } from "../shared/components/widgets/modal/exit-modal/exit-modal.component";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { GetUserDetails } from "../shared/action/account.action";
import { BrowserOnlyService } from "../shared/Api-Services/browser-only.service";
import { ConfirmationErrorComponent } from "../shared/components/widgets/modal/confirmation-error/confirmation-error.component";
import { ErrorService } from "../shared/services/error.service";
import { AddSaddSuccessComponent } from "../shared/components/widgets/modal/add-sadd-success/add-sadd-success.component";
import { PublicService } from "../shared/Api-Services/public.service";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    LoadingBarModule,
    RouterModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,

    BackToTopComponent,
    NewsletterModalComponent,
    ConfirmationErrorComponent,
    AddSaddSuccessComponent,
  ],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
})
export class LayoutComponent {
  @ViewChild("Confirmation")
  confirmationModal: ConfirmationErrorComponent;

  @ViewChild("Addsuccess")
  addsuccessModal: AddSaddSuccessComponent;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(ThemeOptionState.cookies) cookies$: Observable<boolean>;
  @Select(ThemeOptionState.exit) exit$: Observable<boolean>;

  public cookies: boolean;
  public exit: boolean;
  public theme: string;
  public message: string;
  public isBrowser: boolean;

  browserOnlyService = inject(BrowserOnlyService);
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private _ErrorService: ErrorService,
    private _publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeOptionService: ThemeOptionService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.errorSubscription=  this._ErrorService.error.subscribe((res) => {
        if (res) {
          this.confirmationModal?.openModal("error", "error", res);
          this._ErrorService.clearError(); // مسح الخطأ بعد الفتح
        }
      });
    


    this.notificationSubscription=  this._ErrorService.getNotification.subscribe((res) => {
        // التحقق من أن الإشعار ليس فارغًا
        if (res != null) {
          // فتح الـ modal بناءً على الإشعار
          this.addsuccessModal?.openModal("error", "error", res);
      
          // إعادة تعيين الإشعار إلى null بعد فتح الـ modal
            this._ErrorService.clearNotification();
        }
      });
    }
    this.store.dispatch(new GetUserDetails());
    if (this.browserOnlyService.isBrowser()) {
      this.route.queryParams.subscribe(
        (params) => (this.theme = params["theme"])
      );

        

      this.themeOption$.subscribe((theme) => {
        this.themeOptionService.theme_color =
          theme?.general?.primary_color;
        this.themeOptionService.secondary_color =
          theme?.general?.secondary_color;

        // document.documentElement.style.setProperty('--theme-color',this.themeOptionService?.theme_color);
        // document.documentElement.style.setProperty('--theme-color2',this.themeOptionService?.secondary_color);
      });

      // this.cookies$.subscribe((res) => {
      //   console.log(res);
      //   this.cookies = res;
      // });

      this.exit$.subscribe((res) => (this.exit = res));
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.router.url;
        }
      });
      this.themeOptionService.preloader = true;
      // const getCategories$ = this.store.dispatch(new GetCategories({ status: 1 }));
      // const getBlog$ = this.store.dispatch(new GetBlogs({ status: 1, paginate: 10 }));
      // const getProductBySearch$ = this.store.dispatch(new GetProductBySearch());
      // const getPages$ = this.store.dispatch(new GetPages({ status: 1 }));
      const getMenu$ = this.store.dispatch(new GetMenu({ status: 1 }));
      // this.store.dispatch(new GetWishlist())
      // //
      forkJoin([getMenu$]).subscribe({
        complete: () => {
          this.themeOptionService.preloader = false;
        },
      });
    }
  }

  setLogo() {
    var headerLogo;
    var footerLogo;
    var footerClass;
    if (this.theme) {
      if (this.theme == "paris") {
        headerLogo = "assets/images/logo/1.png";
        footerLogo = "assets/images/logo/1.png";
      } else if (this.theme == "osaka") {
        headerLogo = "assets/images/logo/1.png";
        footerLogo = "assets/images/logo/1.png";
      } else if (this.theme == "tokyo") {
        headerLogo = "assets/images/logo/2.png";
        footerLogo = "assets/images/logo/2.png";
      } else if (this.theme == "rome") {
        headerLogo = "assets/images/logo/3.png";
        footerLogo = "assets/images/logo/3.png";
      } else if (this.theme == "madrid") {
        headerLogo = "assets/images/logo/4.png";
        footerLogo = "assets/images/logo/4.png";
        footerClass = "footer-section-2 footer-color-2";
      } else if (this.theme == "berlin") {
        headerLogo = "assets/images/logo/6.png";
        footerLogo = "assets/images/logo/4.png";
        footerClass = "footer-section-2 footer-color-3";
      } else if (this.theme == "denver") {
        headerLogo = "assets/images/logo/6.png";
        footerLogo = "assets/images/logo/4.png";
        footerClass = "footer-section-2 footer-color-3";
      } else if (this.theme == "moscow") {
        headerLogo = "assets/images/logo/6.png";
        footerLogo = "assets/images/logo/4.png";
        footerClass = "footer-section-2 footer-color-3";
      } else if (this.theme == "cairo") {
        headerLogo = "assets/images/logo/7.png";
        footerLogo = "assets/images/logo/4.png";
        footerClass = "footer-section-2 footer-color-3";
      }
    } else {
         const lang =this._publicService.getCurrentLanguage()??'ar'
      this.themeOption$.subscribe((theme) => {
        if(lang=='ar'){
          headerLogo ='assets/images/logo/Asset 6.svg';
          // headerLogo ='assets/images/data/logo.png';
          footerLogo = 'assets/images/logo/Asset 6.svgg';
        }else{

        headerLogo ='assets/images/logo/Asset 6.svg';
        // headerLogo ='assets/images/data/logo.png';
        footerLogo = 'assets/images/logo/Asset 6.svg';
      }

        footerClass =
          theme?.footer.footer_style === "dark_mode"
            ? "footer-section-2 footer-color-3"
            : "";
      });
    }

    return {
      header_logo: headerLogo,
      footer: { footer_logo: footerLogo, footer_class: footerClass },
    };
  }

  ngOnInit() {
    this.setVariant();
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.setVariant();
      }
    });
  }

  setVariant() {
    if (this.theme === "paris" || this.theme === "tokyo") {
      this.themeOptionService.productBox = "basic";
    } else if (this.theme === "berlin" || this.theme === "denver") {
      this.themeOptionService.productBox = "standard";
    } else if (this.theme === "osaka" || this.theme === "rome") {
      this.themeOptionService.productBox = "classic";
    } else if (this.theme === "cairo") {
      this.themeOptionService.productBox = "digital";
    } else if (this.theme === "madrid" || this.theme === "moscow") {
      this.themeOptionService.productBox = "premium";
    } else {
      this.themeOption$.subscribe((theme) => {
        this.themeOptionService.productBox = theme?.product
          ? theme?.product?.product_box_variant
          : "";
      });
    }
    this.store.dispatch(
      new UpdateProductBox(this.themeOptionService.productBox)
    );
  }


  private errorSubscription: Subscription|null=null;
  private notificationSubscription: Subscription|null=null;

  ngOnDestroy() {
    if(this.isBrowser){
      if (this.errorSubscription) { 
        this.errorSubscription.unsubscribe();
      }
      if (this.notificationSubscription) { 
        this.notificationSubscription.unsubscribe();
      }
    }
  }
}
