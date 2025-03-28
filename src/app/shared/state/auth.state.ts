import { Injectable } from "@angular/core";
import { Store, State, Selector, Action, StateContext } from "@ngxs/store";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";
import { AccountClear, GetUserDetails } from "../action/account.action";
import { AuthService } from "../services/auth.service";
import { ForgotPassWord, Login, VerifyEmailOtp, UpdatePassword, Logout, AuthClear, Register, VerifyNumberOTP, LoginWithNumber } from "../action/auth.action";
import { NotificationService } from "../services/notification.service";
import { AuthNumberLoginState } from "../interface/auth.interface";

export interface AuthStateModel {
  email: String;
  number: AuthNumberLoginState | null;
  token: String | Number;
  access_token: String | null;
  permissions: [];
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    email: '',
    token: '',
    number: null,
    access_token: '',
    permissions: [],
  },
})
@Injectable()
export class AuthState {

  constructor(private store: Store, public router: Router,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private authService: AuthService) {}

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    // Pre Fake Login (if you are using ap
    ctx.patchState({
      email: 'john.customer@example.com',
      token: '',
      access_token: '115|laravel_sanctum_mp1jyyMyKeE4qVsD1bKrnSycnmInkFXXIrxKv49w49d2a2c5'
    })
  }

  @Selector()
  static accessToken(state: AuthStateModel): String | null {
    return state.access_token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): Boolean {
    return !!state.access_token;
  }

  @Selector()
  static email(state: AuthStateModel): String {
    return state.email;
  }

  @Selector()
  static number(state: AuthStateModel): AuthNumberLoginState | null {
    return state.number;
  }

  @Selector()
  static token(state: AuthStateModel): String | Number {
    return state.token;
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    // Register Logic Here

  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    // Login Logic Here
    this.store.dispatch(new GetUserDetails());
  }

  @Action(LoginWithNumber)
  loginWithNumber(ctx: StateContext<AuthStateModel>, action: LoginWithNumber) {
    // Login Logic Here
    this.store.dispatch(new GetUserDetails());
  }

  @Action(ForgotPassWord)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassWord) {
    // Forgot Password Logic Here
  }

  @Action(VerifyEmailOtp)
  verifyEmail(ctx: StateContext<AuthStateModel>, action: VerifyEmailOtp) {
    // Verify Logic Here
  }

  @Action(VerifyNumberOTP)
  verifyNumber(ctx: StateContext<AuthStateModel>, action: VerifyNumberOTP) {
    // Verify Logic Here
  }

  @Action(UpdatePassword)
  updatePassword(ctx: StateContext<AuthStateModel>, action: UpdatePassword) {
    // Update Password Logic Here
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    // Logout LOgic Here
  }

  @Action(AuthClear)
  authClear(ctx: StateContext<AuthStateModel>){
    ctx.patchState({
      email: '',
      token: '',
      access_token: null,
      permissions: [],
    });
    this.authService.redirectUrl = undefined;
    this.store.dispatch(new AccountClear());
  }

}
