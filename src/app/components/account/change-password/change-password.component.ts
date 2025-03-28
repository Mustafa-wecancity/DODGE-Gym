import { Component, Inject, PLATFORM_ID } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { NotificationService } from "../../../shared/services/notification.service";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { CustomValidators } from "../../../shared/validator/password-match";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import {
  PostCahngePassword,
  ResponseChangePassword,
} from "../../../shared/interface/Models/Customer/passwordModel";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { isPlatformBrowser, NgClass } from "@angular/common";
import { LayoutService } from "../../../shared/Layout/layout.service";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { PublicService } from "../../../shared/Api-Services/public.service";
import { ErrorService } from "../../../shared/services/error.service";

@Component({
  selector: "app-change-password",
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    ButtonComponent,
    NgbTooltip,
    NgClass,
  ],

  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.scss",
})
export class ChangePasswordComponent {
  public form: FormGroup;
  public closeResult: string;

  public modalOpen: boolean = false;
  isBrowser: boolean;

  constructor(
   
    public _ChangeService: GenericService,
    private formBuilder: FormBuilder, 
    private seoV2Service: SeoV2Service,    private _ErrorService: ErrorService,
    private publicService: PublicService,    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.form = this.formBuilder.group(
      {
        currentPassword: new FormControl("", [Validators.required]),
        newPassword: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ]),
        password_confirmation: new FormControl("", [Validators.required]),
      },
      {
        validator: CustomValidators.MatchValidator(
          "newPassword",
          "password_confirmation"
        ),
      }
    );
  }

  get passwordMatchError() {
    return (
      this.form?.getError("mismatch") &&
      this.form?.get("password_confirmation")?.touched
    );
  }
  get fc() {
    return this.form.controls;
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this._ChangeService.subscription.add(
        this._ChangeService
          .create<GenericResponse<ResponseChangePassword>, PostCahngePassword>(
            API_ENDPOINTS.Customer.ChangePassword,
            this.form.getRawValue()
          )
          .subscribe(
            (res) => {
              const response = res.data;
              if (res.success) {
                // this.notifier.showSuccess("passwordChanged");
  this. _ErrorService.setNotification({message :'passwordChanged'});

                this.form.reset();
              }
              this._ChangeService.submit = true;
            },
            (err) => {
              // this.form.reset()
              this._ChangeService.submit = true;
            }
          )
      );
    }
  }
  private seo() {
       const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(translations.Change_Password);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.MyDashboard.MyServiceRequest.Change_Password
      );
      // this.seoV2Service.setMetaKeywords(
      //   this.seoV2Service.generateKeywords(
      //     translations.MyDashboard.MyServiceRequest.meta_keywords
      //   )
      // );
    });
  }
}
