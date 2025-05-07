import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { Params, pager } from "../../../shared/interface/core.interface";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { PaginationComponent } from "../../../shared/components/widgets/pagination/pagination.component";
import { NoDataComponent } from "../../../shared/components/widgets/no-data/no-data.component";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { ITPagination } from "../../../shared/interface/Models/Pagination/pagination";
import {
  CustomerOrderServiceRequest,
  GetServiceRequest,
  StatusEnum,
} from "../../../shared/interface/Models/ServiceRequest/CreateServiceRequestModel";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { genders } from "../../../shared/interface/Models/City/CityModel";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { CustomPipeForImagesPipe } from "../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { ConfirmationCancelComponent } from "../../../shared/components/widgets/modal/confirmation-cancel/confirmation-cancel.component";
import Swal from "sweetalert2";
import { PublicService } from "../../../shared/Api-Services/public.service";
import { ErrorService } from "../../../shared/services/error.service";
import { TruncatePipe } from "../../../shared/pipe/truncate.pipe";
@Component({
  selector: "app-customer-service-request",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,

    PaginationComponent,
    NoDataComponent,

    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CustomPipeForImagesPipe,
    ConfirmationCancelComponent,TruncatePipe
  ],
  templateUrl: "./customer-service-request.component.html",
  styleUrl: "./customer-service-request.component.scss",
})
export class CustomerServiceRequestComponent extends BaseComponent {
  @ViewChild("audioPlayer") audioPlayer: ElementRef<HTMLAudioElement>;
  @ViewChild("confirmationCancelModal")
  ConfirmationCancelModal: ConfirmationCancelComponent;
  statusEnum = StatusEnum;
  qty: number;
  clearFilter() {
    this.form.reset();
    this.pager = {
      maxResultCount: this.pager.maxResultCount,
      skipCount: this.pager.skipCount,
    };

    this.GetCustomerServiceRequest();
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
    this.GetCustomerServiceRequest();
  }
  public filter: Params = {
    page: 1, // Current page number
    paginate: 10, // Display per page,
  };
  public form: FormGroup;
  public genders: genders[] = [
    { id: 1, title: "Male" },
    { id: 2, title: "Female" },
  ];
  isBrowser: boolean;

  constructor(
    private _CustomerServiceRequest: GenericService,
    private formBuilder: FormBuilder,
    private _ErrorService: ErrorService,

    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.form = this.formBuilder.group({
      serial: new FormControl(""),
      dateFrom: new FormControl(""),
      dateTo: new FormControl(""),
    });
    if (this.isBrowser) {
      this.GetCustomerServiceRequest();
    }

    this.seo();
  }

  setPaginate(page: number) {
    this.filter["page"] = page;
    this.GetCustomerServiceRequest();
  }

  public CustomerOrderServiceRequest: CustomerOrderServiceRequest[] = [];
  GetCustomerServiceRequest(): void {
    this.pager.skipCount =
      (this.filter["page"] - 1) * this.pager.maxResultCount;

    this._CustomerServiceRequest.subscription.add(
      this._CustomerServiceRequest
        .create<GenericResponse<ITPagination<CustomerOrderServiceRequest>>, pager>(
          API_ENDPOINTS.CustomerServiceRequest.GetCustomerRequestList,
          this.pager
        )
        .subscribe(
          (data) => {
            // this.MostOrderedServices = data.data.items;

            this.CustomerOrderServiceRequest = data.data.items;
            this.totalCount = data.data.totalCount;
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }
  get fc() {
    return this.form.controls;
  }
  protected onSubmit() {
    // this.submit = false;

    if (this.fc["dateFrom"].value && this.fc["dateTo"].value) {
      const fromStartDate = this.fc["dateFrom"].value;
      const toEndDate = this.fc["dateTo"].value;

      // قارن بين تاريخ البدء وتاريخ الانتهاء
      if (fromStartDate > toEndDate) {
        this._ErrorService.setError({
          message: "startDateBeforeEndDate",
          title: "Error",
        });
        // this.submit = true;
      } else {
        this.applyFilter();
      }
    } else {
      this.applyFilter();
    }
  }

  //start code ssr
  private seo() {
    const lang = this.publicService.getCurrentLanguage() ?? "ar";
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(
        translations.MyDashboard.MyServiceRequest.ServicesRequestsManagement
      );
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.MyDashboard.MyServiceRequest.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.MyDashboard.MyServiceRequest.meta_keywords
        )
      );
    });
  }
  playAudio() {
    if (this.isBrowser) this.audioPlayer.nativeElement.play();
  }

  UpdateCustomerOrderDetail(item: GetServiceRequest, qty: number): void {
    const params: any = {
      Orderproductd: item?.id,
      ...(qty !== undefined && { qty }), // Include 'qty' only if defined
    };

    this._CustomerServiceRequest.subscription.add(
      this._CustomerServiceRequest
        .get<GenericResponse<any>>(
          API_ENDPOINTS.CustomerServiceRequest.CancelOrUpdateOrderService,
          params
        )
        .subscribe({
          next: (response) => {
            // if (response.success) {
            this.ngZone.run(() => {
              // Update item qty
              // item.qty = qty;
              Swal.fire({
                icon: "success",
                title: "success",
                text: "Update Qty" + " " + qty + " " + "successfully",
              });
              this.GetCustomerServiceRequest();

              // Trigger UI updates
              this.cdr.detectChanges();
            });
            // }
          },
          error: (error) => {
            console.error("Error updating order:", error);
          },
        })
    );
  }

  delete(action: string, data: GetServiceRequest): void {
    // Log for debugging (optional during development)
    console.debug("Deleting service request:", data);

    // Mark submit status as in progress
    this._CustomerServiceRequest.submit = false;

    // Prepare the API call
    const params = { Orderproductd: data?.id };

    this._CustomerServiceRequest
      .get<GenericResponse<any>>(
        API_ENDPOINTS.CustomerServiceRequest.CancelOrUpdateOrderService,
        params
      )
      .subscribe({
        next: (res) => {
          // Update submit status
          this._CustomerServiceRequest.submit = true;

          // Update data state
          // data.isNew = false;

          Swal.fire({
            icon: "success",
            title: "success",
            text: "Cancelled successfully",
          });
          this.filter["page"] = 1;
          this.GetCustomerServiceRequest();
          // Trigger UI updates
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Failed to delete service request:", err);

          // Restore submit status
          this._CustomerServiceRequest.submit = true;
        },
      });
  }

  updateQty(service: any) {
    if (service.qty > 0) {
      // Perform logic to update the quantity in the backend or service.
      console.log(
        `Updated quantity for service ID ${service.id}: ${service.qty}`
      );

      service.qty = service.qty - 1;
      // Trigger UI updates
      this.cdr.detectChanges();
    } else {
      // alert('Quantity must be greater than zero.');
    }
  }
  setPathDecodeURIComponent(path: string) {
    //  return decodeURIComponent(path);
    return path.replace(/[ .]/g, "-"); // Replace spaces with underscores
  }
}
