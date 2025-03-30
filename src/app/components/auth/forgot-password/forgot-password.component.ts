import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import {Select } from "@ngxs/store";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { SettingState } from '../../../shared/state/setting.state';
import { Values } from '../../../shared/interface/setting.interface';
import { ThemeOptionState } from "../../../shared/state/theme-option.state";
import { Option } from "../../../shared/interface/theme-option.interface";
import { AuthService } from "../../../shared/services/auth.service";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule, isPlatformBrowser, NgClass } from "@angular/common";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { CryptoService } from "../../../shared/Api-Services/crypto.service";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import * as data from '../../../shared/data/country-code';
import { Select2Module } from "ng-select2-component";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { ResponseRegister, SendOTP } from "../../../shared/interface/Models/Customer/registerModel";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { CustomValidators } from "../../../shared/validator/password-match";
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { OnlyNumbersDirective } from "../../../shared/directive/only-numbers.directive";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { PublicService } from "../../../shared/Api-Services/public.service";
 
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule,
               ButtonComponent,Select2Module,NgbTooltip,NgClass,OnlyNumbersDirective
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(SettingState.setting) setting$: Observable<Values>;
  
  public codes = data.countryCodes2;
  public form: FormGroup;
 
  public reCaptcha: boolean = true;
  isBrowser: boolean;

  constructor( 
    private _forgotService: GenericService,
    private cryptoService: CryptoService ,
    @Inject(PLATFORM_ID) private platformId: Object,
        private seoV2Service: SeoV2Service,
         private publicService: PublicService,
    public router: Router, 
    public authService: AuthService, 
    public formBuilder: FormBuilder ) {
    this.form = this.formBuilder.group({
      mobile: ['', [Validators.required,        Validators.minLength(11),
        Validators.maxLength(11),]],
        country_code: new FormControl('+20' ),


      recaptcha: [true, [Validators.required]]
    },{validator : CustomValidators.MatchValidator('newPassword', 'password_confirmation')});
    
    // this.setting$.subscribe(setting => {
    //   if((setting?.google_reCaptcha && !setting?.google_reCaptcha?.status) || !setting?.google_reCaptcha) {
    //     this.form.removeControl('recaptcha');
    //     this.reCaptcha = false;
    //   } else {
    //     this.form.setControl('recaptcha', new FormControl(null, Validators.required))
    //     this.reCaptcha = true;
    //   }
    // });

    this.isBrowser = isPlatformBrowser(this.platformId);
this.seo()
  }


  get fc (){
    return this.form.controls;
  }
  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.SendOTP()
  }

  }
  public SendOTP() {
    let form = this.form.value
    // form.mobile= 966 + this.fc['mobile'].value
   this._forgotService.subscription.add( this._forgotService.create<GenericResponse<ResponseRegister>,SendOTP>(API_ENDPOINTS.Customer.SendOTP, { mobile:form.mobile}).subscribe((res) => {
      if (res.success &&res.data['otp']) {
      this.navigateWithEncryptedData(form);
      }
    }))
  }

  navigateWithEncryptedData(form: any) {
    if(this.isBrowser){
      
      const encryptedData = this.cryptoService.encrypt(JSON.stringify(form.mobile));
      const encodedData = encodeURIComponent(encryptedData);
      if(encodedData)
        this.router.navigateByUrl('/auth/otp/forgot/'+encodedData);
    }
  }

  private seo(){
    this.seoV2Service.setMetaImageStatic( 'assets/images/inner-page/forgot.png');
       const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe(translations => {
 
      this.seoV2Service.setTitle(translations.ForgotPassword.header.Text);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(translations.ForgotPassword.header.meta_description)
      this.seoV2Service.setMetaKeywords(this.seoV2Service.generateKeywords(translations.ForgotPassword.header.meta_keywords))
      // this.seoService.setMetaTags(translations);
    });

  }
}
