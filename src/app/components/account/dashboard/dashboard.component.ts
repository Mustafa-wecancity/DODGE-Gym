import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import {
  ICustomerDashboardStatus,
  IGetProfileLocalized,
} from "../../../shared/interface/Models/Customer/profileModel";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { RouterLink } from "@angular/router";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { LayoutService } from "../../../shared/Layout/layout.service";
import { AuthService } from "../../../shared/services/auth.service";
import { PublicService } from "../../../shared/Api-Services/public.service";
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  public Customer: IGetProfileLocalized;
  public customerDashboardStatus: ICustomerDashboardStatus;

  isBrowser: boolean;

  constructor(
    public _dashboardService: GenericService,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public AuthService: AuthService
  ) {
    this.seo();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.isBrowser && this.AuthService.getToken()) {
      this._dashboardService.subscription.add(
        this._dashboardService
          .get<IGetProfileLocalized>(API_ENDPOINTS.Customer.GetProfileLocalized)
          .subscribe(
            (data) => {
              this.Customer = data;
            },
            (error) => {
              console.error("Error fetching data", error);
            }
          )
      );
      this._dashboardService.subscription.add(
        this._dashboardService
          .get<ICustomerDashboardStatus>(
            API_ENDPOINTS.Customer.CustomersPointBalance
          )
          .subscribe(
            (data) => {
              this.customerDashboardStatus = data;
            },
            (error) => {
              console.error("Error fetching data", error);
            }
          )
      );
    }
  }
  //start code ssr
  private seo() {
    const lang = this.publicService.getCurrentLanguage() ?? "ar";
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(
        translations.MyDashboard.Dashboard.welcome_text
      );
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.MyDashboard.Dashboard.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.MyDashboard.Dashboard.meta_keywords
        )
      );
    });
  }
}
