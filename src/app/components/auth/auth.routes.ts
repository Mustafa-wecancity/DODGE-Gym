import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
// import { LoginWithNumberComponent } from "./login-with-number/login-with-number.component";
import { LoginComponent } from "./login/login.component";
import { OtpComponent } from "./otp/otp.component";
import { RegisterComponent } from "./register/register.component";
import { UpdatePasswordComponent } from "./update-password/update-password.component";

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "otp/:type/:encryptedData",
    component: OtpComponent,
  },
  {
    path: "update-password/:encryptedData",
    component: UpdatePasswordComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  
  // {
  //   path: "login-with-number",
  //   component: LoginWithNumberComponent,
  // }
];