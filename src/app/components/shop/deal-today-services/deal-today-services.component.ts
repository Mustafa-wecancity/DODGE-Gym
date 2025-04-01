import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { DealTodayServiceBoxComponent } from "./deal-today-service-box/deal-today-service-box.component";
import { PaginationComponent } from "../../../shared/components/widgets/pagination/pagination.component";
import { TitleComponent } from "../../../shared/components/widgets/title/title.component";
import { NoDataComponent } from "../../../shared/components/widgets/no-data/no-data.component";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { IProductesList } from "../../../shared/interface/Models/Category/CategoryModel";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { PublicService } from "../../../shared/Api-Services/public.service";
import { ActivatedRoute } from "@angular/router";
import { ServicesHome } from "../../../shared/interface/Models/Bundle/PaginationModel";
import { pager } from "../../../shared/interface/core.interface";
import { ITPagination } from "../../../shared/interface/Models/Pagination/pagination";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";

@Component({
  selector: "app-deal-today-services",
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    NoDataComponent,
    DealTodayServiceBoxComponent,
    TitleComponent,PaginationComponent
  ],
  templateUrl: "./deal-today-services.component.html",
  styleUrl: "./deal-today-services.component.scss",
})
export class DealTodayServicesComponent extends BaseComponent {
  filter=  {
    page: 1, // Current page number

  };
  gridCol: string;
  title?: string = "";
  SubServiceCategoryList: IProductesList[];

  public gridClass: string =
    "row g-sm-4 g-3 row-cols-xl-3 row-cols-md-2 row-cols-1 product-list-section";

  public skeletonItems = Array.from({ length: 40 }, (_, index) => index);

  constructor(

    private _DealTodayServices: GenericService,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    private route:ActivatedRoute

  ) {

    super();
    this.seo();
    const page = this.route.snapshot.paramMap.get("page");
    this.filter = {
      page: page ? JSON.parse(page) : 1}

    this.GetDealTodayServices();

 
  }

  setGridClass(gridClass: string) {
    this.gridClass = gridClass;
  }
  setPaginate(data: number) {
    this.filter.page = data;
    this.GetDealTodayServices();
    
  }

  DealTodayServices:ServicesHome[];
  GetDealTodayServices(): void {
    
    this.pager.skipCount = (this.filter.page - 1) * this.pager.maxResultCount;

 
    this._DealTodayServices.subscription.add(
      this._DealTodayServices
        .create<GenericResponse<ITPagination<ServicesHome>>, pager>(
          API_ENDPOINTS.Home.DealTodayServices,
          this.pager
        )
        .subscribe(
          (data) => {
            // this.MostOrderedServices = data.data.items;
        
            this.DealTodayServices = data.data.items;
            this.totalCount = data.data.totalCount;
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }
  private seo(): void {
     const lang =this.publicService.getCurrentLanguage()??'ar'
  
    this.seoV2Service.loadTranslations(lang).subscribe(
      (translations) => {
        this.seoV2Service.setTitle(translations?.DealToday?.header?.Title || 'Deal Today');
        this.seoV2Service.setHostUrlIndex();
        this.seoV2Service.setMetaDescription(
          translations?.DealToday?.header?.meta_description || 'Deal Today'
        );
        this.seoV2Service.setMetaKeywords(
          this.seoV2Service.generateKeywords(
            translations?.DealToday?.header?.meta_keywords || 'Deal Today'
          )
        );
      },
      (error) => {
        console.error('Error loading translations', error);
      }
    );
  }
  
}
