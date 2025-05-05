import {
  ChangeDetectorRef,
  Component,
  inject,
  Inject,
  NgZone,
  PLATFORM_ID,
  signal,
  ViewChild,
} from "@angular/core";
import { interval, takeWhile } from "rxjs";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { Router, RouterModule } from "@angular/router";
import { CurrencySymbolPipe } from "../../../shared/pipe/currency-symbol.pipe";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { NoDataComponent } from "../../../shared/components/widgets/no-data/no-data.component";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import {
ICustomerCart,
  ICustomerCartUpdate,
  IHedaerCart,
  IUpdateCustomercart,
} from "../../../shared/interface/Models/CustomerCart/CustomerCart";
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import {
  NgbAlertModule,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbTooltip,
} from "@ng-bootstrap/ng-bootstrap";
import { CustomDateParserFormatter } from "../../../shared/components/custom-date-parser-formatter/custom-date-parser-formatter.component";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { environment } from "../../../../environments/environment.development";
import { DeleteModalComponent } from "../../../shared/components/widgets/modal/delete-modal/delete-modal.component";
import { BrowserOnlyService } from "../../../shared/Api-Services/browser-only.service";
import { AuthService } from "../../../shared/services/auth.service";
import { PublicService } from "../../../shared/Api-Services/public.service";
import { CustomPipeForImagesPipe } from "../../../shared/pipe/custom-pipe-for-images-pipe.pipe";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencySymbolPipe,

    ButtonComponent,
    NoDataComponent,

    NgbDatepickerModule,
    NgbAlertModule,
    // ,NgxMicRecorderModule
    NgbTooltip,
    DeleteModalComponent,
    CustomPipeForImagesPipe
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent extends BaseComponent {
  model: string;

  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  protected cout = signal(0);
  protected coupon = signal("");

  isRecording = false;
  recordedTime: string | undefined;
  blobUrl: SafeUrl | undefined;
  isBrowser: boolean;
  constructor(
    private router: Router,
    private CartDetails: GenericService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    private fb: UntypedFormBuilder,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    public AuthService: AuthService
  ) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (isPlatformBrowser(this.platformId) && AuthService.getToken()) {
      this.GetAll();
      this.init();
    }
    this.seo();
  }

  mediaRecorder: MediaRecorder;
  audioChunks: any[] = [];
  VoiceFile: any;
  time: number = 0;

  audioUrl: string = "";
  isStart: boolean = false;
  ClaerCart: boolean = false;

  startRecording() {
    if (this.isBrowser) {
      this.isStart = true;
      this.time = 0;
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
          this.VoiceFile = event.data;
        };

        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
          this.audioUrl = URL.createObjectURL(audioBlob);

           this.fc["voiceNotepathUrl"].setValue(URL.createObjectURL(audioBlob));
          this.audioChunks = [];
        };
      });

      interval(1000)
        .pipe(takeWhile(() => this.isStart))
        .subscribe(() => {
          this.time++;
        });
    }
  }
  stopRecording() {
    if (this.isBrowser) {
      this.isStart = false;
      this.mediaRecorder.stop();
    }
  }

  // functions
  //

  public CustomerCart: ICustomerCart;
  public HedaerCart: IHedaerCart;
  public cartServiceDetails: any[] = [];
  public cartServiceByPoints: any[] = [];
  public cartOrderBundleDetails: any[] = [];
  public cartSavingPackageDetails: any[] = [];

  GetAll(): void {
    this.GetCartDetailsDetail();
  }

  get fc() {
    return this.CartForm.controls;
  }

  GetCartDetailsDetail() {
    this.CartDetails.subscription.add(
      this.CartDetails.get<ICustomerCart>(
        API_ENDPOINTS.Cart.CustomerCart
      ).subscribe(
        (data) => {
          this.CustomerCart = data;
          this.HedaerCart = {
            deductedPoints: this.CustomerCart?.deductedPoints,
            pointsAfterWallet: this.CustomerCart?.pointsAfterWallet,
            totalAfterWallet: this.CustomerCart?.totalAfterWallet,
            customerWalletBalance: this.CustomerCart?.customerWalletBalance,
            customerWalletPoints: this.CustomerCart?.customerWalletPoints,
            couponCode: this.CustomerCart?.couponCode,
            customerId: this.CustomerCart?.customerId,
            id: this.CustomerCart?.id,
            subTotal: this.CustomerCart?.subTotal,
            couponDiscount: this.CustomerCart?.couponDiscount,
            taxPercent: this.CustomerCart?.taxPercent,
            taxValue: this.CustomerCart?.taxValue,
            total: this.CustomerCart?.total,
          };

          const form: IUpdateCustomercart = {
            executionDate: this.CustomerCart?.executionDate,
            voiceNote: this.CustomerCart?.voiceNote,
            couponId: this.CustomerCart?.couponId,
            comment: this.CustomerCart?.comment,
          };
          this.coupon.set(this.CustomerCart?.couponCode ?? "");
          if (form) {
            this.init(form);
          }
        },
        (error) => {
          console.error("Error fetching data", error);
          // Optional: Add user-friendly error handling
        }
      )
    );
  }

  calculateTotalPrice(): number {
    // if( this.isBrowser){

    // حساب الإجمالي لمصفوفة serviceDetails
    const totalServiceDetails = this.cartServiceDetails.reduce(
      (acc, item) =>
        acc +
        (item.priceAfterDiscount
          ? item.priceAfterDiscount
          : item.price * item.qty),
      0
    );

    // حساب الإجمالي لمصفوفة serviceByPoints
    // const totalServiceByPoints = serviceByPoints.reduce((acc, item) => acc + (item.point * item.qty), 0);

    // حساب الإجمالي لمصفوفة orderBundleDetails
    const totalOrderBundleDetails = this.cartOrderBundleDetails.reduce(
      (acc, item) =>
        acc +
        (item.priceAfterDiscount
          ? item.priceAfterDiscount
          : item.price * item.qty),
      0
    );

    // حساب الإجمالي لمصفوفة savingPackageDetails
    const totalSavingPackageDetails = this.cartSavingPackageDetails.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    // جمع الإجماليات
    return (
      totalServiceDetails + totalOrderBundleDetails + totalSavingPackageDetails
    );
    // }
  }

  getTotalServiceByPoints(): number {
    return this.cartServiceByPoints.reduce(
      (acc, item) => acc + item.point * item.qty,
      0
    );
  }

  RemoveFromCart(item: any) {
    const params = { cartdetailId: item.id };
    this.CartDetails.subscription.add(
      this.CartDetails.get<ICustomerCart>(
        API_ENDPOINTS.Cart.RemoveFromCart,
        params
      ).subscribe(
        (response) => {
          if (response) {
            this.ngZone.run(() => {
              // Assuming response.data is of type ICustomerCart
 
              if (response != null) {
                this.HedaerCart = response;

                // Remove the item from the other lists in the ICustomerCart
                this.removeItemFromCustomerCart(item.id);

                // Update the view
                this.cdr.detectChanges();
              } else {
                this.CustomerCart = {} as ICustomerCart; // Sets CustomerCart to null
                this.HedaerCart = {} as IHedaerCart;
                this.ClaerCart = true;
                this.cdr.detectChanges();
              }
            });
          } else {
            this.CustomerCart = {} as ICustomerCart; // Sets CustomerCart to null
            this.HedaerCart = {} as IHedaerCart;
            this.ClaerCart = true;

            this.cdr.detectChanges();
          }
        },
        (error) => {
          console.error("Error fetching data", error);
        }
      )
    );
  }

  removeItemFromCustomerCart(itemId: number): void {
    this.CustomerCart.bundleList = this.CustomerCart.bundleList.filter(
      (item) => item.id != itemId
    );
    this.CustomerCart.savingPackageList =
      this.CustomerCart.savingPackageList.filter((item) => item.id != itemId);
    this.CustomerCart.serviceByPointList =
      this.CustomerCart.serviceByPointList.filter((item) => item.id != itemId);
    this.CustomerCart.productByPriceList =
      this.CustomerCart.productByPriceList.filter((item) => item.id != itemId);
  }

  /**
   * Updates the customer cart details based on item and quantity.
   * @param item - The cart item to update.
   * @param qty - The new quantity.
   * @param buyByPoints - Optional flag indicating purchase by points.
   */
  UpdateCustomerCartDetail(item: any, qty: number, buyByPoints?: boolean) {
    // item.qty = qty;
    const params = {
      customerCartDetailId: item?.id,
      qty: qty,
      buyByPoints: buyByPoints ?? null,
    };
    this.CartDetails.subscription.add(
      this.CartDetails.create<GenericResponse<ICustomerCartUpdate>, any>(
        API_ENDPOINTS.Cart.UpdateCustomerCartDetail,
        params
      ).subscribe(
        (response) => {
          if (response.success) {
            // this.GetCartDetailsDetail()

            this.ngZone.run(() => {
              this.HedaerCart = response.data.customerCartTotal;
               if (buyByPoints != undefined) {
                this.removeItemFromCustomerCart(item.id);
                if (buyByPoints) {
                  this.CustomerCart.serviceByPointList.push(item);
                } else this.CustomerCart.productByPriceList.push(item);
              } else {
                Object.assign(item, response.data.customerCartItems);
              }
              this.cdr.detectChanges();
            });
          }
        },
        (error) => {
          console.error("Error fetching data", error);
        }
      )
    );
  }

  ValidateCouponForCart() {
    const params = { CouponCode: this.coupon() };
    this.CartDetails.subscription.add(
      this.CartDetails.get<IHedaerCart>(
        API_ENDPOINTS.Coupon.ValidateCouponForCart,
        params
      ).subscribe(
        (data) => {
          // this.GetCartDetailsDetail()
          this.HedaerCart = data;
        },
        (error) => {
          console.error("Error fetching data", error);
        }
      )
    );
  }

  private seo() {
    // this.seoV2Service.setMetaImage( '' );
    const lang = this.publicService.getCurrentLanguage() ?? "ar";
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(
        translations.Cart.header.Flexible +
          " " +
          " " +
          translations.Cart.header.ShoppingCart
      );
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(translations.Cart.header.Subtitle);
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(translations.Cart.header.Subtitle)
      );
      // this.seoService.setMetaTags(translations);
    });
  }

  public CartForm: UntypedFormGroup;
  ServiceFormData: FormData = new FormData();

  private init(row?: IUpdateCustomercart) {
 
    this.CartForm = this.fb.group({
      comment: [row?.comment || ""],
      voiceNotepathUrl: [
        row?.voiceNote
          ? environment.serverFirstHalfOfImageUrl + row?.voiceNote
          : row?.voiceNote || "",
      ],
      executionDate: [
        row?.executionDate?.slice(0, 10) || "",
        Validators.required,
      ],
    });
  }

  //  part UpdateCustomercart
  UpdateCustomercart() {
    this.CartDetails.subscription.add(
      this.CartDetails.create<GenericResponse<any>, any>(
        API_ENDPOINTS.Cart.UpdateCustomercart,
        this.ServiceFormData
      ).subscribe(
        (data) => {
          if (data.success) {
            // this.GetCartDetailsDetail()
          }
        },
        (error) => {
          console.error("Error fetching data", error);
        }
      )
    );
  }
  private loopform() {
    this.ServiceFormData = new FormData();
    Object.keys(this.CartForm.value).forEach((key) => {
      if (this.CartForm.value[key] != null) {
        if (typeof this.CartForm.value[key] !== "object") {
          this.ServiceFormData.append(key, this.CartForm.value[key]);
        } else {
          Object.keys(this.CartForm.value[key]).forEach((subkey) => {
            this.ServiceFormData.append(key, this.CartForm.value[key][subkey]);
          });
        }
      }
    });

    // Ensure VoiceFile is a valid Blob before appending

    if (this.VoiceFile instanceof Blob) {
      this.ServiceFormData.append(
        "VoiceNotepath",
        this.VoiceFile,
        `recording${Date.now()}.mp3`
      );
    } else {
      console.error("VoiceFile is not a Blob:", this.VoiceFile?.blog);
    }

    this.ConfirmCheckout();
  }
  public onSubmit() {
    if (this.isStart) this.stopRecording();
    this.CartForm.markAllAsTouched();

    if (this.CartForm.valid) this.loopform();
    else this.CartForm.markAllAsTouched();
  }

  browserOnlyService = inject(BrowserOnlyService);

  ConfirmCheckout() {
    if (this.isBrowser) {
      this.publicService.isLoading.next(true);

      this.CartDetails.subscription.add(
        this.CartDetails.create<any, FormData>(
          API_ENDPOINTS.Cart.ConfirmCheckout,
          this.ServiceFormData
        ).subscribe(
          (res) => {
             const data =res.data
            if (res)
              // this.router.navigate([`/main/Confirm`], {
              //   queryParams: { status: 'success' },
              //   queryParamsHandling: 'merge',
              // });
              this.publicService.isLoading.next(false);
            if (this.browserOnlyService.isBrowser() &&  data?.paymentUrl) {
              window.location.href = data.paymentUrl;
            } else {
              // http://localhost:4200/main/Confirm?responseMessage=Failed
              this.router.navigate([`/Confirm`], {
                queryParams: { responseCode: "000" },
                queryParamsHandling: "merge",
              });
            }
          },
          (error) => {
            // this.router.navigate([`/Confirm`], {
            //   queryParams: { responseCode: '001' },
            //   queryParamsHandling: 'merge',
            // })
            this.publicService.isLoading.next(false);
            console.error("Error fetching data", error);
          }
        )
      );
    }
  }
  // message = "";
  // placeholder = "a3ml voice yala";
  // listening = false;

  ngOnDestroy() {
    if (this.isBrowser) {
      const currentUrl = this.fc["voiceNotepathUrl"].value;
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    }
  }

  delete(action: string, data: any) {
    if (action == "delete" && data) this.RemoveFromCart(data);
  }

  setPathDecodeURIComponent(path:string) {
    //  return decodeURIComponent(path);
     return path.replace(/[ .]/g, '-'); // Replace spaces with underscores
  
  }
}
