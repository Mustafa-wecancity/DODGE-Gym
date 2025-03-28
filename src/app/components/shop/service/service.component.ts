import {
  Component,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { Product } from "../../../shared/interface/product.interface";
import { ThemeOptionState } from "../../../shared/state/theme-option.state";
import { Option } from "../../../shared/interface/theme-option.interface";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { ProductThumbnailComponent } from "./product-details/product-thumbnail/product-thumbnail.component";
import { RelatedProductsComponent } from "./product-details/widgets/related-products/related-products.component";
import { ServicesHome } from "../../../shared/interface/Models/Bundle/PaginationModel";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { pager } from "../../../shared/interface/core.interface";
import { IServiceGetById } from "../../../shared/interface/Models/Service/service-get-by-id";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { PublicService } from "../../../shared/Api-Services/public.service";
import { LazyLoadSectionDirective } from "../../../shared/directive/lazyLoad-section.directive";
import { ServiceMediaComponent } from "./product-details/widgets/service-media/service-media.component";
@Component({
  selector: "app-service",
  standalone: true,
  imports: [
    CommonModule,
    ProductThumbnailComponent,
    RelatedProductsComponent,
    LazyLoadSectionDirective,ServiceMediaComponent
  ],
  templateUrl: "./service.component.html",
  styleUrl: "./service.component.scss",
})
export class ServiceComponent {
  //extends BaseComponent
  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  public layout: string = "product_digital";
  public product: Product;
  public isScrollActive = false;
  private paramMapSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    public _Service: GenericService,
    private seoV2Service: SeoV2Service,
    private renderer: Renderer2,
    private publicService: PublicService
  ) {
    this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
      const slug = params.get("id");
      if (slug) this.GetAllData(+slug); // Ensure the ID is a number
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove("stickyCart");
    }
    // this.queryParamsSubscription.unsubscribe();
    this.paramMapSubscription.unsubscribe();
  }

  /**
   * An array to store the most ordered services.
   * This array holds instances of the ServicesHome type.
   */
  MostOrderedServices: ServicesHome[] = [];
  MostViewedServices: ServicesHome[] = [];
  TrendingServices: ServicesHome[] = [];
  public ServiceGetById: IServiceGetById | null = null;

  /**
   * Fetches detailed information about a specific service using its ID.
   * Updates SEO metadata and fetches related services data.
   *
   * @param id - The unique identifier of the service.
   * @returns {void}
   */
  GetAllData(id: number): void {
    const params = { ProductId: id };
    this._Service.subscription.add(
      this._Service
        .get<IServiceGetById>(
          API_ENDPOINTS.Product.GetProductByIdForHome,
          params
        )
        .subscribe(
          (data) => {
            if (data) {
              this.ServiceGetById = data;
              this.seoV2Service.setTitle(data.name);
              this.seoV2Service.setMetaImageStatic(
                "assets/images/pageList/Services.jpg"
              );

              const lang = this.publicService.getCurrentLanguage() ?? "ar";

              this.seoV2Service.loadTranslations(lang).subscribe(
                (translations) => {
                  //  const metaDescription = `${translations.oneOfServices} ${data.categoryName} ${translations.belongsTo} ${data.parentCategoryName}`;
                  //  this.seoV2Service.setMetaDescription(metaDescription);
                },
                (translationError) => {
                  console.error("Error loading translations", translationError);
                }
              );
              if (isPlatformBrowser(this.platformId)) {
                this.publicService.changeTitle(
                  this.setPathDecodeURIComponent(data.name)
                );
              }
            }
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }

  pager: pager = {
    maxResultCount: 24,
    skipCount: 0,
  };

  setPathDecodeURIComponent(path: string) {
    //  return decodeURIComponent(path);
    return path.replace(/[ .]/g, "-"); // Replace spaces with underscores
  }

  public MostViewedServicesParent: boolean = false;
}
