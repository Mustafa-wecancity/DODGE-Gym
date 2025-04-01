import {
  Component,
  inject,
  Inject,
  Input,
  PLATFORM_ID,
  signal,
  SimpleChanges,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Variation } from "../../../../../../shared/interface/product.interface";
import { Option } from "../../../../../../shared/interface/theme-option.interface";
import { TranslateModule } from "@ngx-translate/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ButtonComponent } from "../../../../../../shared/components/widgets/button/button.component";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { IServiceGetById } from "../../../../../../shared/interface/Models/Service/service-get-by-id";
import { GenericService } from "../../../../../../shared/Api-Services/generic.service";
import { GenericResponse } from "../../../../../../shared/interface/Models/generic-response";
import { API_ENDPOINTS } from "../../../../../../shared/Api-Services/API_ENDPOINTS";
import { AuthService } from "../../../../../../shared/services/auth.service";
import { NotificationService } from "../../../../../../shared/services/notification.service";
import { ErrorService } from "../../../../../../shared/services/error.service";
import {
  ServiceData,
  productdCalculator,
} from "../../../../../../shared/interface/Models/CustomerPackage/CustomerPackageService";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-product-contain",
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    NgbModule,
    ButtonComponent,
    CommonModule,FormsModule
  ],
  templateUrl: "./product-contain.component.html",
  styleUrl: "./product-contain.component.scss",
})
export class ProductContainComponent {
  @Input() ServiceGetById: IServiceGetById;
  @Input() option: Option | null;

  public productQty: number = 1;
  public selectedVariation: Variation | null;
  public totalPrice: number = 0;

  public ordersCount: number = 10;
  public viewsCount: number = 30;
  public is_wishlist: boolean = false;

  constructor(
    public _Service: GenericService,
    private _AuthService: AuthService,
    private _NotificationService: NotificationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["ServiceGetById"] && changes["ServiceGetById"].currentValue) {
      this.selectedVariation = null;
      // clearInterval(this.countsInterval);
      this.ServiceGetById = changes["ServiceGetById"]?.currentValue;
      if (isPlatformBrowser(this.platformId)) {
        if (this.ServiceGetById) {
          {
            // this.CalculateServiceTotalWithTax();
          }
        }
      }
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.ServiceGetById) {
        {
          // this.CalculateServiceTotalWithTax();
        }
        //  this.router.navigate([lang,'/BundleDetails/', data.id,this.setPathDecodeURIComponent(data.name)]);
      }
    }
  }

  selectVariation(variation: Variation) {
    this.selectedVariation = variation;
  }

  updateQuantity(qty: number) {
    if (1 > this.productQty + qty) return;
    this.productQty = this.productQty + qty;
    // this.CalculateServiceTotalWithTax();
  }
  _ErrorService = inject(ErrorService);

  addToCart(product: IServiceGetById ) {
    if (product && this.productQty > 0) {
      if (this._AuthService.getToken()) {
        const params = {
          productId: product.id,
          qty: this.productQty,
        };
        this._Service.subscription.add(
          this._Service
            .create<GenericResponse<any>, any>(
              API_ENDPOINTS.Product.AddToCart,
              params
            )
            .subscribe(
              // must be change endpointe post to get
              (data) => {
                if (data.success) {
                  this. _ErrorService.setNotification({message :'تم إضافة المنتج إلى سلة التسوق'});
                }
              },
              (error) => {
                console.error("Error fetching data", error);
              }
            )
        );
      } else {
        this.router.navigate([`/auth/login`]);
      }
    }
  }

  protected coupon = signal("");

  ServiceFormData: FormData = new FormData();
  public loopform() {
    if ( this.ServiceGetById&&this.productQty > 0) {

    this.ServiceFormData = new FormData();

    this.ServiceFormData.append("productd", this.ServiceGetById.id.toString());
    this.ServiceFormData.append("Qty", this.productQty.toString());
    // Ensure VoiceFile is a valid Blob before appending
    if (this.coupon() != "") {
      this.ServiceFormData.append("CouponCode", this.coupon());
    }

    this.PurchaseService();
    }
  }
  ServiceData:ServiceData
  CalculateServiceTotalWithTax(coupon?: string): void {
    const bundleCalculator: productdCalculator = {
      productd: this.ServiceGetById.id,
      qty: this.productQty,
      couponCode: this.coupon() != "" ? this.coupon() : null,
    };

    this._Service.subscription.add(
      this._Service
        .create<GenericResponse<ServiceData>, any>(
          API_ENDPOINTS.CustomerServiceRequest.CalculateServiceTotalWithTax,
          bundleCalculator
        )
        .subscribe(
          (data) => {
            console.log(data.data)
            this.ServiceData = data.data;
            if (data) {
            }
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }

    public PurchaseService() {
      if ( this.productQty > 0) {
        if (this._AuthService.getToken()) {
         
  
          this._Service.subscription.add(
            this._Service
              .create<GenericResponse<any>, FormData>(
                API_ENDPOINTS.CustomerServiceRequest.CreateServiceRequest,
                this.ServiceFormData
              )
              .subscribe(
                // must be change endpointe post to get
                (data) => {
                  if (data.success) {
                    // this._NotificationService.showSuccess("add_success")
  
                    this._ErrorService.setNotification({
                      message: "تم شراء المنتج ",
                    });
                  }
                },
                (error) => {
                  console.error("Error fetching data", error);
                }
              )
          );
        } else {
          //   // this._NotificationService.showError("Must_be_login")
  
          this.router.navigate(["/auth/login"]);
  
          this.router.navigate(["/auth/login"]);
        }
      }
    }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
  }
}
