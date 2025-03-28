import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { Params, pager } from "../../../shared/interface/core.interface";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { Router, RouterModule } from "@angular/router";
 
import { PaginationComponent } from "../../../shared/components/widgets/pagination/pagination.component";
import { NoDataComponent } from "../../../shared/components/widgets/no-data/no-data.component";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { ITPagination } from "../../../shared/interface/Models/Pagination/pagination";
import { GetCustomerBundlePurchasesDto } from "../../../shared/interface/Models/Bundle/CustomerBundleCategoriesModel";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import Swal from "sweetalert2";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { PublicService } from "../../../shared/Api-Services/public.service";
import { CryptoService } from "../../../shared/Api-Services/crypto.service";
@Component({
  selector: "app-orders",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
 
    PaginationComponent,
    NoDataComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: "./orders.component.html",
  styleUrl: "./orders.component.scss",
})
export class OrdersComponent extends BaseComponent {
  public form: FormGroup;

  public filter: Params = {
    page: 1, // Current page number
    paginate: 10, // Display per page,
  };
  isBrowser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    private OrderService: GenericService,    @Inject(PLATFORM_ID) private platformId: Object, private cryptoService:CryptoService,  private router: Router
  ) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);
    if(this.isBrowser){

      this.GetOrder();
    }
    this.seo();
    this.initForm();
  }

  setPaginate(page: number) {
    this.filter["page"] = page;
    this.GetOrder();
  }

  public Orders: GetCustomerBundlePurchasesDto[] = [];
  GetOrder(): void {
    this.pager.skipCount =
      (+this.filter["page"] - 1) * this.pager.maxResultCount;

    this.OrderService.subscription.add(
      this.OrderService.create<
        GenericResponse<ITPagination<GetCustomerBundlePurchasesDto>>,
        pager
      >(API_ENDPOINTS.Customer.GetMyPurchases, this.pager).subscribe(
        (data) => {
          // this.MostOrderedServices = data.data.items;
          this.Orders = data.data.items;
          this.totalCount = data.data.totalCount;
        },
        (error) => {
          console.error("Error fetching data", error);
        }
      )
    );
  }

  //form implementations
  initForm() {
    this.form = this.formBuilder.group({
      serial: new FormControl(""),
      dateFrom: new FormControl(""),
      dateTo: new FormControl(""),
      sortBy: new FormControl(""),
      sortDirection: new FormControl("desc"),
    });
  }
  get fc() {
    return this.form.controls;
  }
  clearFilter() {
    this.form.reset();
    this.pager = {
      maxResultCount: this.pager.maxResultCount,
      skipCount: this.pager.skipCount,
    };

    this.GetOrder();
  }
  applyFilter() {
    const formValues = this.form.getRawValue();
    // تصفية القيم التي ليست null أو undefined
    const filteredFormValues = Object.fromEntries(
      Object.entries(formValues).filter(
        ([_, v]) => v !== null && v !== undefined && v !== ""
      )
    );

    this.pager = {
      maxResultCount: this.pager.maxResultCount,
      ...filteredFormValues,
      skipCount: 0,
    };
    this.filter["page"] = 1;
    this.GetOrder();
  }

  protected onSubmit() {
    // this.submit = false;

    if (this.fc["dateFrom"].value && this.fc["dateTo"].value) {
      const fromStartDate = this.fc["dateFrom"].value;
      const toEndDate = this.fc["dateTo"].value;

      // قارن بين تاريخ البدء وتاريخ الانتهاء
      if (fromStartDate > toEndDate) {
        // this.notifier.showError('Start Date Should Be Before To End Date');
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Start Date Should Be Before To End Date",
        });
        // this.submit = true;
      } else {
        this.applyFilter();
      }
    } else {
      this.applyFilter();
    }
  }

  sortBy(sort: string) {
    this.fc["sortBy"].setValue(sort);

    this.fc["sortDirection"].value == "asc"
      ? this.fc["sortDirection"].setValue("desc")
      : this.fc["sortDirection"].setValue("asc");

    this.pager = {
      ...this.pager,
      sortBy: sort,
      sortDirection: this.fc["sortDirection"].value,
    };
    this.GetOrder();
  }

  //start code ssr
  private seo() {
       const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(translations.MyDashboard.MyOrder.my_orders);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.MyDashboard.MyOrder.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.MyDashboard.MyOrder.meta_keywords
        )
      );
    });
  }


  
  navigateWithEncryptedData(orderId: any): void {
    if (!this.isBrowser) {
      return; // Exit if not running on the browser
    }
  
    try {
      // Encrypt and encode the order ID
      const encryptedData = this.cryptoService.encrypt(JSON.stringify(orderId));
      const encodedData = encodeURIComponent(encryptedData);
  
      if (encodedData) {
        // Get the current language or default to 'ar'
        const currentLanguage = this.publicService.getCurrentLanguage() || 'ar';
  
        // Navigate to the report viewer with the encrypted data
        const targetUrl = `${currentLanguage}/account/report-viewer/${encodedData}`;
        this.router.navigateByUrl(targetUrl);
      } else {
        console.error('Failed to encode the encrypted data.');
      }
    } catch (error) {
      console.error('Error during encryption or navigation:', error);
    }
  }
  
}
