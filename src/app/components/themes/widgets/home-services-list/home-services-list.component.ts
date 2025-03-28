import { Component, Input, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { Observable } from "rxjs";
import * as data from "../../../../shared/data/owl-carousel";
import { ThemeOptionState } from "../../../../shared/state/theme-option.state";
import { Option } from "../../../../shared/interface/theme-option.interface";
import { CommonModule } from "@angular/common";
import { SkeletonProductBoxComponent } from "../../../../shared/components/widgets/product-box/widgets/skeleton-product-box/skeleton-product-box.component";
import { NoDataComponent } from "../../../../shared/components/widgets/no-data/no-data.component";
import { ServicesHome } from "../../../../shared/interface/Models/Bundle/PaginationModel";
import { ServicesBoxComponent } from "../../../../shared/components/widgets/product-box/services-box/services-box.component";
import { RouterLink } from "@angular/router";
import { GenericService } from "../../../../shared/Api-Services/generic.service";
import { BaseComponent } from "../../../../shared/components/base/base.component";
import { API_ENDPOINTS } from "../../../../shared/Api-Services/API_ENDPOINTS";
import { pager } from "../../../../shared/interface/core.interface";
import { ITPagination } from "../../../../shared/interface/Models/Pagination/pagination";
import { GenericResponse } from "../../../../shared/interface/Models/generic-response";
type HomeEndpoints = keyof typeof API_ENDPOINTS.Home;

@Component({
  selector: "app-home-services-list",
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    SkeletonProductBoxComponent,
    ServicesBoxComponent,
    NoDataComponent,
    RouterLink,
  ],
  templateUrl: "./home-services-list.component.html",
  styleUrl: "./home-services-list.component.scss",
})
export class HomeServicesListComponent extends BaseComponent implements OnInit {
  @Input() boxClass: string;
  @Input() sliderOption: OwlOptions = data.productSlider;
  @Input() slider: boolean;
  @Input() showItem: number;
  @Input() ServicesHome: ServicesHome[];
  @Input() close: boolean = false;
  @Input() type!: HomeEndpoints; // Ensures valid keys from API_ENDPOINTS.Home

  public skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  constructor(public _homeService: GenericService) {
    super();
  }

  ngOnChanges() {}

  ngOnInit() {
    this.themeOption$.subscribe((option) => {
      if (
        option?.product?.product_box_border ||
        option?.product?.image_bg ||
        option?.product?.product_box_bg
      ) {
        this.sliderOption["margin"] = 15;
      }
    });

    this.get();
  }

  get(): void {
    this.pager.maxResultCount = 8;
    const endpoint = API_ENDPOINTS.Home[this.type];
    if (!endpoint) {
      console.warn(`Invalid endpoint type: ${this.type}`);
      return;
    }
    console.log(endpoint);
    this._homeService.subscription.add(
      this._homeService
        .create<GenericResponse<ITPagination<ServicesHome>>, pager>(
          endpoint,
          this.pager
        )
        .subscribe({
          next: (data) => {
            this.ServicesHome = data.data.items;
          },
          error: (error) => {},
        })
    );
  }
}
