import { Component, Inject, PLATFORM_ID } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { CommonModule, isPlatformBrowser, NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { CryptoService } from "../../../shared/Api-Services/crypto.service";
import {
  PostResetPassword,
  ResponseResetPassword,
} from "../../../shared/interface/Models/Customer/passwordModel";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { PostVefiryUser } from "../../../shared/interface/Models/Customer/verificationModel";
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { CustomValidators } from "../../../shared/validator/password-match";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { PublicService } from "../../../shared/Api-Services/public.service";

@Component({
  selector: "app-update-password",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,

    ButtonComponent,
    NgbTooltip,
    NgClass,
  ],
  templateUrl: "./update-password.component.html",
  styleUrl: "./update-password.component.scss",
})
export class UpdatePasswordComponent {
  public form: FormGroup;

  isBrowser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    private cryptoService: CryptoService,
    public _updateService: GenericService,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.seo();

    if (this.isBrowser) {
      const encryptedData = this.route.snapshot.paramMap.get("encryptedData");
      let dataCustomer: PostVefiryUser | null = null;
      if (encryptedData) {
        dataCustomer = JSON.parse(this.cryptoService.decrypt(encryptedData));
      }

      this.form = this.formBuilder.group(
        {
          otp: new FormControl(dataCustomer ? dataCustomer.otp : "", [
            Validators.required,
          ]),
          mobile: new FormControl(dataCustomer ? dataCustomer.mobile : "", [
            Validators.required,
          ]),
          newPassword: new FormControl("", [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ]),
          confirmPassword: new FormControl("", [Validators.required]),
        },
        {
          validator: CustomValidators.MatchValidator(
            "newPassword",
            "confirmPassword"
          ),
        }
      );
    }
  }
  get passwordMatchError() {
    return (
      this.form?.getError("mismatch") &&
      this.form?.get("confirmPassword")?.touched
    );
  }
  get fc() {
    return this.form.controls;
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.resetPassword();
    }
  }

  private resetPassword() {
    this._updateService.submit = false;

    this._updateService.subscription.add(
      this._updateService
        .create<ResponseResetPassword, PostResetPassword>(
          API_ENDPOINTS.Customer.ResetPassword,
          this.form.getRawValue()
        )
        .subscribe(
          (response) => {
            if (response) {
              this.router.navigate([`/auth/login/`]);
              this.form.reset();
            }
            this.form.reset();

            this._updateService.submit = true;
          },
          (err) => {
            // this.form.reset()
            this._updateService.submit = true;
          }
        )
    );
  }
  private seo() {
    this.seoV2Service.setMetaImageStatic("assets/images/inner-page/log-in.png");
    const lang = this.publicService.getCurrentLanguage() ?? "ar";
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(translations.reset_your_account_password);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.updatePassword.header.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.updatePassword.header.meta_keywords
        )
      );
      // this.seoService.setMetaTags(translations);
    });
  }
}
