import { Component, inject, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { Select } from "@ngxs/store";
import {  Observable   } from "rxjs";
import * as data from "../../../shared/data/owl-carousel";
import {
  Option,
} from "../../../shared/interface/theme-option.interface";
import { ThemeOptionState } from "../../../shared/state/theme-option.state";
import { HomeBannerComponent } from "../widgets/home-banner/home-banner.component";
import { TitleComponent } from "../../../shared/components/widgets/title/title.component";

import {  isPlatformBrowser } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { SaveOfferComponent } from "../widgets/save-offer/save-offer.component";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import {
  IRecentNewsHome,
  ServicesHome,
} from "../../../shared/interface/Models/Bundle/PaginationModel";
  import { HomeServicesListComponent } from "../widgets/home-services-list/home-services-list.component";
import { IAds } from "../../../shared/interface/Models/iads";
import { IGetCategory } from "../../../shared/interface/Models/Category/CategoryModel";
import { NewsComponent } from "../widgets/news/news.component";
 import { CustomPipeForImagesPipe } from "../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { RouterLink } from "@angular/router";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
 import { BrowserOnlyService } from "../../../shared/Api-Services/browser-only.service";
import { LazyLoadSectionDirective } from "../../../shared/directive/lazyLoad-section.directive";
 import { CustomerFeedbackComponent } from "../widgets/customer-feedback/customer-feedback.component";
import { CategorieimagesHomeComponent } from "../widgets/categories-home/categories-home.component";
 
 
@Component({
  selector: "app-home-service",
  standalone: true,
  imports: [
    HomeBannerComponent,
    TitleComponent,
    CustomPipeForImagesPipe,
    TranslateModule,
    SaveOfferComponent,
    HomeServicesListComponent,
    NewsComponent,
 RouterLink, CustomerFeedbackComponent,
        // Directives
        LazyLoadSectionDirective,CategorieimagesHomeComponent
        // LazyLoadDirective,
  ],

  templateUrl: "./home-service.component.html",
  styleUrl: "./home-service.component.scss",
})
export class HomeServiceComponent extends BaseComponent implements OnInit {
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  browserOnlyService = inject(BrowserOnlyService);
  public categorySlider = data.categorySlider;
  public productSlider = data.productSlider;

  constructor(
    private seoV2Service: SeoV2Service,
    public _homeService: GenericService,@Inject(PLATFORM_ID) private platformId: any) {
    super();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.GetAllData();
      // window.addEventListener('scroll', this.onScroll.bind(this));
    }
    // this.seo()
  }

  TrendingServices: ServicesHome[] = [];
  MostOrderedServices: ServicesHome[] = [];
  MostViewedServices: ServicesHome[] = [];
  Ads: IAds[] = [];
  GetCategory: IGetCategory[] = [];
  News: IRecentNewsHome[] = [];

 
  GetAllData(): void {
    this.pager.maxResultCount = 6;
    const params = { TopCount: 300 };
    const params3 = { top: 10 };
  
    // Start sequential fetching
    this._homeService.subscription.add(
      this._homeService
        .getAll<IAds>(API_ENDPOINTS.Home.AdsManagement, params3)
        .subscribe(
          (data) => {
            this.Ads = data;
            this.isLoadingHomeData=true
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
 
  }
  
  // onScroll() {
  //   const element = document.querySelector('.de');

  //   // تحقق من أن العنصر ليس null
  //   if (element) {
  //     const position = element.getBoundingClientRect();

  //     if (position.top >= 0 && position.bottom <= window.innerHeight) {
  //       element.classList.add('active');
  //     } else {
  //       element.classList.remove('active');
  //     }
  //   }
  // }



  // preformnce 
  // 
  isLoadingHomeData: boolean = false;

  public newsionsParent:boolean= false
  public bundleParent:boolean= false
  public categoriesParent:boolean= false
  public TrendingServicesParent:boolean= false
  public MostOrderedServicesParent :boolean= false
  public MostViewedProductssParent :boolean= false
  public TrendingServicesdsParent :boolean= false
  public valuesParent:boolean= false
  public CustomerFeedbackParent:boolean= false
  }


