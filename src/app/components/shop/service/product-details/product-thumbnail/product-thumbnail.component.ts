import { Component, Input, ViewChild } from "@angular/core";
import { Option } from "../../../../../shared/interface/theme-option.interface";
import * as data from "../../../../../shared/data/owl-carousel";
import { TranslateModule } from "@ngx-translate/core";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { ProductContainComponent } from "../widgets/product-contain/product-contain.component";
import { PaymentOptionComponent } from "../widgets/payment-option/payment-option.component";
import { ProductSidebarComponent } from "../sidebar/sidebar.component";
import { GenericService } from "../../../../../shared/Api-Services/generic.service";

import { BaseComponent } from "../../../../../shared/components/base/base.component";
import { ActivatedRoute, Router } from "@angular/router";
import { IServiceGetById } from "../../../../../shared/interface/Models/Service/service-get-by-id";
import { SaveOfferComponent } from "../../../../themes/widgets/save-offer/save-offer.component";
import { CustomPipeForImagesPipe } from "../../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { PublicService } from "../../../../../shared/Api-Services/public.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ServiceMediaComponent } from "../widgets/service-media/service-media.component";

@Component({
  selector: "app-product-thumbnail",
  standalone: true,
  imports: [
    TranslateModule,
    CarouselModule,
    NgxImageZoomModule,
    ProductContainComponent,
    SaveOfferComponent,CustomPipeForImagesPipe,NgbModule,ServiceMediaComponent
  ],
  templateUrl: "./product-thumbnail.component.html",
  styleUrl: "./product-thumbnail.component.scss",
})
export class ProductThumbnailComponent extends BaseComponent {
  @Input() option: Option | null;


  public activeSlide: string = "0";

  public productMainThumbSlider = data.productMainThumbSlider;
  public productThumbSlider = data.productThumbSlider;
  constructor(
    private route: ActivatedRoute,
    public _homeService: GenericService,private router:Router,private publicService:PublicService
  ) {
    super();
  }
  redirect(path: string): void {
    // Ensure a default language is provided if getCurrentLanguage returns null or undefined
    const language = this.publicService.getCurrentLanguage() ?? 'ar';
    const url = `/${language}${path}`;  // Corrected the URL formation
    this.router.navigateByUrl(url);
}
  @Input() ServiceGetById: IServiceGetById;

  public active = "description";

}
