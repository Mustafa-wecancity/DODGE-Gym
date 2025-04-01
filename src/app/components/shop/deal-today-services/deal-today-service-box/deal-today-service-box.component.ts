import { Component, Inject, Input, PLATFORM_ID } from "@angular/core";
import { NgbModule, NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import {
  CommonModule,
  isPlatformBrowser,
} from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ServicesHome } from "../../../../shared/interface/Models/Bundle/PaginationModel";
import { StripHtmlPipe } from "../../../../shared/pipe/strip-html.pipe";
import { TruncatePipe } from "../../../../shared/pipe/truncate.pipe";
import { GenericService } from "../../../../shared/Api-Services/generic.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { GenericResponse } from "../../../../shared/interface/Models/generic-response";
import { API_ENDPOINTS } from "../../../../shared/Api-Services/API_ENDPOINTS";
import { CustomPipeForImagesPipe } from "../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
 

@Component({
  selector: "app-deal-today-service-box",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    TranslateModule,
    TruncatePipe,
    StripHtmlPipe, CustomPipeForImagesPipe
  ],
  templateUrl: "./deal-today-service-box.component.html",
  styleUrl: "./deal-today-service-box.component.scss",
})
export class DealTodayServiceBoxComponent {
  @Input() service: ServicesHome;
  @Input() class: string;
  @Input() close: boolean;

  public currentDate: number | null;
  public saleStartDate: number | null;

  constructor(
    public _Service: GenericService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
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
  addToWishlist(service: ServicesHome) {
    const params = { serviceId: service.id };

    if (this._AuthService.getToken()) {
      this._Service.subscription.add(
        this._Service
          .get<GenericResponse<any>>(
            API_ENDPOINTS.CustomerWishlists.AddToWishList,
            params
          )
          .subscribe(
            (data) => {
              service.isWishlist = !service.isWishlist;
            },
            (error) => {
              console.error("Error fetching data", error);
            }
          )
      );

      // }
    } else {
      this.router.navigate([`/auth/login`]);
    }
  }

//   redirect(path: string): void {
//     // Ensure a default language is provided if getCurrentLanguage returns null or undefined
//     const language = this.publicService.getCurrentLanguage() ?? 'ar';
//     const url = `/${language}${path}`;  // Corrected the URL formation
//     this.router.navigateByUrl(url);
// }

  setPathDecodeURIComponent(path: string) {
    //  return decodeURIComponent(path);
    return path.replace(/[ .]/g, "-"); // Replace spaces with underscores
  }
}
