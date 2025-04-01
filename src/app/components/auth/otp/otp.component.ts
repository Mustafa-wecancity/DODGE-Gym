import { Component, Inject, PLATFORM_ID, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";

import { AuthNumberLoginState } from "../../../shared/interface/auth.interface";
import { AuthService } from "../../../shared/services/auth.service";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { CryptoService } from "../../../shared/Api-Services/crypto.service";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import {
  GetVefiryUser,
  PostVefiryUser,
} from "../../../shared/interface/Models/Customer/verificationModel";
import {
  ResponseRegister,
  SendOTP,
} from "../../../shared/interface/Models/Customer/registerModel";
import { interval, takeWhile } from "rxjs";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { isPlatformBrowser } from "@angular/common";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { LayoutService } from "../../../shared/Layout/layout.service";
import { PublicService } from "../../../shared/Api-Services/public.service";
import { NgOtpInputComponent, NgOtpInputConfig, NgOtpInputModule } from 'ng-otp-input';
import { ErrorService } from "../../../shared/services/error.service";
@Component({
  selector: "app-otp",
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, ButtonComponent, NgOtpInputModule,NgOtpInputComponent],
  templateUrl: "./otp.component.html",
  styleUrl: "./otp.component.scss",
})
export class OtpComponent {
  public form: FormGroup;
  public email: string;
  public otpType: any;
  public number: AuthNumberLoginState;

  mobile: string;
  type: string;
  isBrowser: boolean;

  constructor(
    public Route: ActivatedRoute,
    public router: Router,
    public store: Store,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private cryptoService: CryptoService,
    public _VerificationService: GenericService,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,

    @Inject(PLATFORM_ID) private platformId: Object,
    private _ErrorService:ErrorService
  ) {
    this.form = this.formBuilder.group({
      otp: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.seo();
  }

  ngOnInit() {
    if (this.isBrowser) {
      const encryptedData = this.Route.snapshot.paramMap.get("encryptedData");
      this.type = this.Route.snapshot.paramMap.get("type") ?? "";
      if (encryptedData) {
        this.mobile= JSON.parse(
          this.cryptoService.decrypt(encryptedData)
        );
      }

      if (this.mobile) this.SendOTP();
    }
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.SendVerify();
    }
  }

  get fc() {
    return this.form.controls;
  }
  public otp: any;
  public showOtp: boolean = false;
  public showSendOtp: boolean = false;

  public time: number = 0;
  // private interval: any;
  public SendOTP() {
    // this.otp = 123456
    // this.time = 80;
    // this.showSendOtp = false;
    // interval(1000).pipe(
    //   takeWhile(() => this.time > 0)
    // ).subscribe(() => {
    //   this.time--;
    //   if (this.time <= 0) {
    //     this.showSendOtp = true;
    //   }
    // });

    this._VerificationService.subscription.add(
      this._VerificationService
        .create<GenericResponse<ResponseRegister>, SendOTP>(
          API_ENDPOINTS.Customer.SendOTP,
          {
            mobile: this.mobile,
          }
        )
        .subscribe((res) => {
          this.showSendOtp = false;
          if (res.success && res.data["otp"]) {
            this.showOtp = true;
         

            this.otp = res.data["otp"];
            this.fc["otp"].setValue(res.data["otp"].toString());
            this.time = res.data["secondsCount"];
            this.showSendOtp = false;

            interval(1000)
              .pipe(takeWhile(() => this.time > 0))
              .subscribe(() => {
                this.time--;
                if (this.time <= 0) {
                  this.showSendOtp = true;
                }
              });
          }
        })
    );
  }

  SendVerify() {
    this._VerificationService.submit = false;
    if(this.otp&&this.otp?.length ==6){
    if (this.type == "verify") {
      this._VerificationService.subscription.add(
        this._VerificationService
          .create<GenericResponse<GetVefiryUser>, PostVefiryUser>(
            API_ENDPOINTS.Customer.VefiryUser,
            { mobile: this.mobile, otp: this.otp}
          )
          .subscribe(
            (response) => {
              if (response.success) {
                if (
                  isPlatformBrowser(this.platformId) &&
                  typeof localStorage !== "undefined"
                ) {
                  localStorage.setItem(
                    "customerAuthorization",
                    response.data["token"]
                  );
                  localStorage.setItem(
                    "customer_login",
                    JSON.stringify(response)
                  );
                  this.navigateWithEncryptedData();
                  this._VerificationService.submit = true;
                }
              }
              else
              {
                this.ngOtpInput?.setValue('')
                this.isOtpInvalid =true;
                
              this._VerificationService.submit = true;

              }
            },
            (err) => {
              this.form.get("otp")?.setErrors({ incorrect: true });
              this.fc["otp"].reset();
              this._VerificationService.submit = true;
              this.ngOtpInput?.setValue('')
              this.isOtpInvalid =true;
            }
          )
      );
    } else {
      this._VerificationService.subscription.add(
        this._VerificationService
          .create<GenericResponse<any>, PostVefiryUser>(
            API_ENDPOINTS.Customer.VerifyOTP,
            { mobile: this.mobile, otp: this.otp }
          )
          .subscribe(
            (response) => {
              if (response.success) {
                this.navigateWithEncryptedData();
                this._VerificationService.submit = true;
              }
              else
              {
                this.ngOtpInput?.setValue('')
                this.isOtpInvalid =true;
              this._VerificationService.submit = true;

              }
            },
            (err) => {
              this.form.get("otp")?.setErrors({ incorrect: true });
              this.fc["otp"].reset();
              this._VerificationService.submit = true;
              this.ngOtpInput?.setValue('')
              this.isOtpInvalid =true;
            }
          )
      );
    }
  }
  else
  {
    // this.isOtpInvalid =true;
    this._VerificationService.submit = true;
    this._ErrorService.setError({
      message: "The verification number must be 6 digits",
      title: "warning",
    });
  }
    }

  navigateWithEncryptedData() {
    if (this.isBrowser) {
      if (this.type == "verify") {
        this.router.navigateByUrl("/");
        localStorage.setItem("customer_name", "");
        localStorage.setItem("imageCustomer", "");
        localStorage.setItem("companyName", "");
        localStorage.setItem(
          "companyNumber",
          ""
        );
        localStorage.setItem("isCompany","false");
      } else {
        const encryptedData = this.cryptoService.encrypt(
          JSON.stringify({
            mobile: this.mobile,
            otp: this.otp,
          })
        );
        const encodedData = encodeURIComponent(encryptedData);
        if (encodedData)
          this.router.navigateByUrl("/auth/update-password/" + encodedData);
      }
    }
  }

  private seo() {
    this.seoV2Service.setMetaImageStatic("assets/images/inner-page/otp.png");
       const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(translations.please_enter_the_one_time_password_to_verify_your_account);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.Otp.header.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.Otp.header.meta_keywords
        )
      );
      // this.seoService.setMetaTags(translations);
    });
  }

  @ViewChild('ngOtpInputRef') ngOtpInput: any;
  otpValues: string[] = [];
  protected isOtpInvalid: boolean = false;
  config: NgOtpInputConfig = {
    length: 6,
    allowNumbersOnly: true,
    disableAutoFocus: true,
    isPasswordInput: false,
    placeholder: '',
  };

  protected onOtpChange(otp: any) {
    this.otp = otp;
  }
}
