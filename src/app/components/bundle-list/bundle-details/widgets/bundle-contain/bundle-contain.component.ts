import { Router, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../../../../shared/components/widgets/button/button.component";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import {
  Component,
  inject,
  Inject,
  Input,
  PLATFORM_ID,
  signal,
  SimpleChanges,
} from "@angular/core";
import {
  BundleCalculator,
  BundleData,
  IGetBundleList,
} from "../../../../../shared/interface/Models/CustomerPackage/CustomerPackageService";
import { Option } from "../../../../../shared/interface/theme-option.interface";
import { Cart } from "../../../../../shared/interface/cart.interface";
import { Variation } from "../../../../../shared/interface/product.interface";
import { GenericService } from "../../../../../shared/Api-Services/generic.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { NotificationService } from "../../../../../shared/services/notification.service";
import { GenericResponse } from "../../../../../shared/interface/Models/generic-response";
import { API_ENDPOINTS } from "../../../../../shared/Api-Services/API_ENDPOINTS";
import { ErrorService } from "../../../../../shared/services/error.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-bundle-contain",
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    NgbModule,
    ButtonComponent,
    CommonModule,FormsModule
  ],
  templateUrl: "./bundle-contain.component.html",
  styleUrl: "./bundle-contain.component.scss",
})
export class BundleContainComponent {

  @Input() Bundle: IGetBundleList;
  public countsInterval: any;
  @Input() option: Option | null;
  protected coupon = signal("");

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
    if (changes["Bundle"] && changes["Bundle"].currentValue) {
      this.selectedVariation = null;
      // clearInterval(this.countsInterval);
      this.Bundle = changes["Bundle"]?.currentValue;
      if (isPlatformBrowser(this.platformId)) {
        if (this.Bundle) {
          {
            this.CalculateBundleTotalWithTax();
          }
        }
      }
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.Bundle) {
        {
          this.CalculateBundleTotalWithTax();
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
    this.CalculateBundleTotalWithTax();
  }

  public bundleData: BundleData;

  CalculateBundleTotalWithTax(coupon? :string): void {
    const bundleCalculator: BundleCalculator = {
      bundleId: this.Bundle.id,
      quantity: this.productQty,
      coupon: this.coupon() !=""?this.coupon() :null,
    };

    this._Service.subscription.add(
      this._Service
        .create<GenericResponse<BundleData>, any>(
          API_ENDPOINTS.Bundle.CalculateBundleTotalWithTax,
          bundleCalculator
        )
        .subscribe(
          (data) => {
            this.bundleData = data.data;
            if (data) {
            }
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }

  public PurchaseBundle(product: IGetBundleList, buyNow?: boolean) {
    if (product && this.productQty > 0) {
      if (this._AuthService.getToken()) {
        const params = {
          bundleId: product.id,
          quantity: this.productQty,
          coupon: null,
        };

        this._Service.subscription.add(
          this._Service
            .create<GenericResponse<any>, any>(
              API_ENDPOINTS.Bundle.PurchaseBundle,
              params
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
  _ErrorService = inject(ErrorService);





  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.countsInterval) {
      clearInterval(this.countsInterval);
    }
  }
}
