import { Component, Inject, PLATFORM_ID } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { CustomValidators } from "../../../shared/validator/password-match";
import * as data from "../../../shared/data/country-code";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule, isPlatformBrowser, NgClass } from "@angular/common";
import { Select2Module } from "ng-select2-component";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { OnlyNumbersDirective } from "../../../shared/directive/only-numbers.directive";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import {
  PostRegister,
  ResponseRegister,
} from "../../../shared/interface/Models/Customer/registerModel";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { CryptoService } from "../../../shared/Api-Services/crypto.service";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { PublicService } from "../../../shared/Api-Services/public.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    Select2Module,
    RouterModule,
    ButtonComponent,
    OnlyNumbersDirective,
    NgbTooltip,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  public form: FormGroup;

  public codes = data.countryCodes2;
  public tnc = new FormControl(false, [Validators.requiredTrue]);
  public reCaptcha: boolean = true;
  isBrowser: boolean;

  constructor(
    public _registerervice: GenericService,
    private cryptoService: CryptoService,
    private seoV2Service: SeoV2Service,
    public publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.seo();

    this.form = this.formBuilder.group(
      {
        mobile: [
          "",
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
          ],
        ],
        passwordHash: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],

        country_code: new FormControl('+20' ),

        password_confirmation: new FormControl("", [Validators.required]),
        recaptcha: new FormControl(false, Validators.required),
      },
      {
        validator: CustomValidators.MatchValidator(
          "passwordHash",
          "password_confirmation"
        ),
      }
    );
  }

  get passwordMatchError() {
    return (
      this.form.getError("mismatch") &&
      this.form.get("password_confirmation")?.touched
    );
  }

  get fc() {
    return this.form.controls;
  }
  submit() {
    this._registerervice.submit = false;
    this.form.markAllAsTouched();
    if (this.tnc.invalid) {
      this._registerervice.submit = true;
      return;
    }
    if (this.form.valid) {
      this.customer_regsiter();
    }
  }

  public otp: number;
  public showOtp: boolean = false;
  public showSendOtp: boolean = false;

  public time: number = 0;

  private customer_regsiter() {
    this._registerervice.submit = false;
    let form = this.form.value;
    // form.mobile= 966 + this.fc["mobile"].value;
    this._registerervice.subscription.add(
      this._registerervice
        .create<GenericResponse<ResponseRegister>, PostRegister>(
          API_ENDPOINTS.Customer.Create,
          form
        )
        .subscribe(
          (res) => {
            const response = res.data;
            if (res.success && response.otp)
              this.navigateWithEncryptedData(form);
            this._registerervice.submit = true;
          },
          (err) => {
            this._registerervice.submit = true;
          }
        )
    );
  }

  navigateWithEncryptedData(form: any) {
    if (this.isBrowser) {
      const encryptedData = this.cryptoService.encrypt(
        JSON.stringify(form.mobile)
      );
      const encodedData = encodeURIComponent(encryptedData);

      if (encodedData)
        this.router.navigateByUrl("/auth/otp/verify/" + encodedData);
    }
  }

  private seo() {
    this.seoV2Service.setMetaImageStatic(
      "assets/images/inner-page/sign-up.png"
    );
    const lang = this.publicService.getCurrentLanguage() ?? "ar";
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(translations.create_new_account);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.RegisterS.header.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.RegisterS.header.meta_keywords
        )
      );
      // this.seoService.setMetaTags(translations);
    });
  }
}
