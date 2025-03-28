import { Component, Inject, inject, Input, PLATFORM_ID } from "@angular/core";
import { Params, pager } from "../../../shared/interface/core.interface";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { CategoryServiceComponent } from "./category/category.component";
import { ActivatedRoute } from "@angular/router";
import { combineLatest } from "rxjs";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { BaseComponent } from "../../../shared/components/base/base.component";
import {
  IParentCategoryAndServices,
  ISlider,
} from "../../../shared/interface/Models/Category/CategoryModel";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { LayoutService } from "../../../shared/Layout/layout.service";
import { BrowserOnlyService } from "../../../shared/Api-Services/browser-only.service";
import { PublicService } from "../../../shared/Api-Services/public.service";

@Component({
  selector: "app-category-and-service-slider",
  standalone: true,
  imports: [CommonModule, CategoryServiceComponent],
  templateUrl: "./category-and-service-slider.component.html",
  styleUrl: "./category-and-service-slider.component.scss",
})
export class CategoryAndServiceSliderComponent extends BaseComponent {
  browserOnlyService = inject(BrowserOnlyService);

  public layout: string = "collection_category_slider";
  public skeleton: boolean = true;

  public filter: Params = {
    page: 1, // Current page number
    paginate: 20, // Display per page, // Note we are using json thats why its it static
    status: 1,
    category: "",
    sortBy: "",
    sortDirection: "",
    productitle: "",
  };

  public totalItems: number = 0;
  public id: string;

  constructor(
    private route: ActivatedRoute,
    private _CategoryService: GenericService,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject منصة التشغيل

  ) {
    super();
    combineLatest([this.route.params, this.route.queryParams]).subscribe(
      
      ([params, queryParams]) => {
        // if (isPlatformBrowser(this.platformId)) {

        
         this.id = params["id"];
        this.filter = {
          page: queryParams["page"] ? queryParams["page"] : 1,
          paginate: 200,
          status: 1,
    
          category: queryParams["category"] ? queryParams["category"] : "",
          productitle: queryParams["productitle"]
            ? queryParams["productitle"]
            : "",
          sortBy: queryParams["sortBy"] ? queryParams["sortBy"] : "",
          sortDirection: queryParams["sortDirection"]
            ? queryParams["sortDirection"]
            : "",
        };
        this.GetCategory();
      }
      
    );
    // Get Query params..


  }
  protected IParentCategoryAndServices: IParentCategoryAndServices | null;
  // protected slider: ISlider;
  GetCategory(): void {
    let dataPost: { [key: string]: any } = {
      maxResultCount: this.pager.maxResultCount,
      skipCount: (+this.filter["page"] - 1) * this.pager.maxResultCount,
      mainCategoryId: +this.id,
      subCategoryId: this.filter["category"] ? +this.filter["category"] : null,
      sortBy: this.filter["sortBy"] ? this.filter["sortBy"] : null,
      productitle: this.filter["productitle"]
        ? this.filter["productitle"]
        : null,
      sortDirection: this.filter["sortDirection"]
        ? this.filter["sortDirection"].replace(/_/g, "")
        : null,
    };


    // Remove properties with null values
    dataPost = Object.fromEntries(
      Object.entries(dataPost).filter(([_, v]) => v !== null)
    );
    this._CategoryService.subscription.add(
      this._CategoryService
        .create<GenericResponse<IParentCategoryAndServices>, any>(
          API_ENDPOINTS.Category.ParentCategoryAndServices,
          dataPost
        )
        .subscribe(
          (data) => {
            
            // this.MostOrderedServices = data.data.items;
            this.IParentCategoryAndServices = data.data;
            this.filter["totalCount"] =
              this.IParentCategoryAndServices?.productList?.totalCount ?? 0;
            if (this.IParentCategoryAndServices.mainCategoryId ) {

               this.seoV2Service.setMetaImageStatic("assets/images/pageList/Services.jpg");

              this.seoV2Service.setTitle(
                this.IParentCategoryAndServices.mainCategoryName
              );
              this.seoV2Service.setHostUrlIndex();
              this.seoV2Service.setMetaDescription(
                this.IParentCategoryAndServices.minCategoryDescriptione|| 'Default keywords'
              );
              this.seoV2Service.setMetaKeywords(
                this.seoV2Service.generateKeywords(
                  this.IParentCategoryAndServices.minCategoryDescriptione|| 'Default keywords'
                )
              );
            } else {
             this. seo();
            }
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }

  private seo(){
    // this.seoV2Service.setMetaImage( '' );
    const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe(translations => {
      this.seoV2Service.setTitle(translations.Home.header.MostOrderedServices);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaImageStatic("assets/images/pageList/Services.jpg");


      // this.seoV2Service.setMetaDescription(translations.Bundle.header.meta_description)
      // this.seoV2Service.setMetaKeywords(this.seoV2Service.generateKeywords(translations.Bundle.header.meta_keywords))

    });

  }
}
