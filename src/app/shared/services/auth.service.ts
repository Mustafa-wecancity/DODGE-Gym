import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { AuthNumberLoginState, AuthStateModal, AuthUserForgotModel, AuthUserStateModel, AuthVerifyNumberOTPState, RegisterModal, UpdatePasswordModel, VerifyEmailOtpModel } from "../interface/auth.interface";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { PublicService } from "../Api-Services/public.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  public redirectUrl: string | undefined;
  public otpType: string;

  constructor(private http: HttpClient, private _router:Router,
    @Inject(PLATFORM_ID) private platformId: Object,private publicService:PublicService) {}

  // Auth Function Here

  public getToken(): string | null {
    if ( isPlatformBrowser(this.platformId)&&typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('customerAuthorization');
      return token;
    } else {
      return null; // Return null if localStorage is not defined
    }
  }
  public GetByName(name:string): string  {
    if ( isPlatformBrowser(this.platformId)&&typeof localStorage !== 'undefined') {
      const returned = localStorage.getItem(name);
      return returned ??"";
    } else {
      return ""; // Return null if localStorage is not defined
    }
  }

  // customerData(){
  //   const customerLogin =localStorage.getItem('customer_login');;
  //   if (customerLogin) {
  //     try {
  //      this.customerData = JSON.parse(customerLogin);
  //     } catch (e) {
  //       console.error('Error parsing customer login data', e);
  //     }
  //   }
  // }
  logOut(): void {
    if ( isPlatformBrowser(this.platformId)&&typeof localStorage !== 'undefined') {

    localStorage.clear();
    // location.reload()
    this._router.navigate([`/${this.publicService.getCurrentLanguage()}/auth/login`]);
  }
}
}
