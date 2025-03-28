import {
  Component,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { NgbModule, NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import {
  CommonModule,
  TitleCasePipe,
  isPlatformBrowser,
} from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { IProductesList } from "../../../../../../shared/interface/Models/Category/CategoryModel";
import { ButtonComponent } from "../../../../../../shared/components/widgets/button/button.component";
import { CurrencySymbolPipe } from "../../../../../../shared/pipe/currency-symbol.pipe";
import { GenericService } from "../../../../../../shared/Api-Services/generic.service";
import { NotificationService } from "../../../../../../shared/services/notification.service";
import { API_ENDPOINTS } from "../../../../../../shared/Api-Services/API_ENDPOINTS";
import { GenericResponse } from "../../../../../../shared/interface/Models/generic-response";
import { AuthService } from "../../../../../../shared/services/auth.service";
 import { TruncatePipe } from "../../../../../../shared/pipe/truncate.pipe";
import { StripHtmlPipe } from "../../../../../../shared/pipe/strip-html.pipe";
import { LazyLoadDirective } from "../../../../../../shared/directive/lazy-load.directive";
import { CustomPipeForImagesPipe } from "../../../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { PublicService } from "../../../../../../shared/Api-Services/public.service";

@Component({
  selector: "app-services-box",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    TranslateModule,
    CurrencySymbolPipe,
    TitleCasePipe,
    ButtonComponent,
    TruncatePipe,
    StripHtmlPipe,LazyLoadDirective,CustomPipeForImagesPipe
  ],
  templateUrl: "./services-box.component.html",
  styleUrl: "./services-box.component.scss",
})
export class ServicesBoxComponent {
  @Input() service: IProductesList;
  @Input() class: string;
  @Input() close: boolean;

  public currentDate: number | null;
  public saleStartDate: number | null;

  constructor(
    public _Service: GenericService,
    private _NotificationService: NotificationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object, private publicService:PublicService,
    private _AuthService: AuthService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {}

  externalProductLink(link: string) {
    // if (link && isPlatformBrowser(this.platformId)) {
    //   window.open(link, "_blank");
    // }
  }
  addToWishlist(product: IProductesList) {
    const params = { productId: product.productId };

    if (this._AuthService.getToken()) {
      this._Service.subscription.add(
        this._Service
          .get<GenericResponse<any>>(
            API_ENDPOINTS.CustomerWishlists.AddToWishList,
            params
          )
          .subscribe(
            // must be change endpointe post to get
            (data) => {
              // service.isWishlist=true;
              // service.isWishlist = !service.isWishlist;
              // this._NotificationService.showSuccess("add_success");
              // }
            },
            (error) => {
              console.error("Error fetching data", error);
            }
          )
      );

      // }
    } else {
      const language = this.publicService.getCurrentLanguage() ?? 'ar';
      this.router.navigate([`/${language}/auth/login`]);
    }
  }
  redirect(path: string): void {
    // Ensure a default language is provided if getCurrentLanguage returns null or undefined
    const language = this.publicService.getCurrentLanguage() ?? 'ar';
    const url = `/${language}${path}`;  // Corrected the URL formation
    this.router.navigateByUrl(url);
}
  setPathDecodeURIComponent(path:string) {
    //  return decodeURIComponent(path);
     return path.replace(/[ .]/g, '-'); // Replace spaces with underscores

  }
}
