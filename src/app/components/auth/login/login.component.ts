import { Component, Inject, PLATFORM_ID } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { Values } from "../../../shared/interface/setting.interface";
import { SettingState } from "../../../shared/state/setting.state";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { ResponseLogin } from "../../../shared/interface/Models/Customer/loginModel";
import { OnlyNumbersDirective } from "../../../shared/directive/only-numbers.directive";
import { PostRegister } from "../../../shared/interface/Models/Customer/registerModel";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { LayoutService } from "../../../shared/Layout/layout.service";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import * as data from '../../../shared/data/country-code';
import { Select2Module } from 'ng-select2-component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { PublicService } from "../../../shared/Api-Services/public.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule, //AlertComponent,
    ButtonComponent,
    OnlyNumbersDirective,Select2Module,NgbTooltip
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {

   @Select(SettingState.setting) setting$: Observable<Values>;
   public codes = data.countryCodes2;

  public form: FormGroup;

  public reCaptcha: boolean = true;
  isBrowser: boolean;

  constructor(
    public _loginService: GenericService,
    private router: Router,
    private formBuilder: FormBuilder,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.form = this.formBuilder.group({
      mobile: ['', [Validators.required,        Validators.minLength(11),
        Validators.maxLength(11),]],
      country_code: new FormControl('966', [Validators.required]),

      password: new FormControl('', [Validators.required]),
      // recaptcha: new FormControl(null)
    });
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.seo();
  }

  get fc(){
   return this.form.controls;
  }
  
  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let form = this.form.value;
      // form.mobile= 966 + this.form.controls["mobile"].value;

      this._loginService.submit = false;

      this._loginService.subscription.add(
        this._loginService
          .create<GenericResponse<ResponseLogin>, PostRegister>(
            API_ENDPOINTS.Customer.Login,
            form
          )
          .subscribe(
            (res) => {
              const response = res.data;
              if (response) {
                if (
                  isPlatformBrowser(this.platformId) &&
                  typeof localStorage !== "undefined"
                ) {
                  localStorage.setItem(
                    "customerAuthorization",
                    response["token"]
                  );
                  localStorage.setItem(
                    "customer_login",
                    JSON.stringify(response)
                  );
                  localStorage.setItem("customer_name", response["fullName"]);
                  localStorage.setItem("imageCustomer", response["imagePath"]);

                  this.navigateToProfileInfo();
                }
                this.form.reset();
              }
              this._loginService.submit = true;
            },
            (err) => {
              this._loginService.submit = true;
            }
          )
      );
    }
  }

  navigateToProfileInfo() {
    if (this.isBrowser) {
      
      this.router.navigate([`/${this.publicService.getCurrentLanguage()}/account/dashboard`]);
      //   .then(() => {
      //     // Reload the current page after navigation
      //     // this.location.replaceState(this.router.url);
      //     // window.location.reload();
      //   });
    }
  }

  private seo() {
    this.seoV2Service.setMetaImageStatic("assets/images/inner-page/log-in.png");
       const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(translations.login_your_account);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.Login.header.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.Login.header.meta_keywords
        )
      );
      // this.seoService.setMetaTags(translations);
    });
  }


}
