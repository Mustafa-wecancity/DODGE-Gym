import { Routes } from "@angular/router";
import { CategoryAndServiceSliderComponent } from "./category-and-service-slider/category-and-service-slider.component";
import { ServiceComponent } from "./service/service.component";
import { ConfirmPaymentComponent } from "./checkout/confirm-payment/confirm-payment.component";
import { PrivacyPolicyComponent } from "../../shared/components/Policy/privacy-policy/privacy-policy.component";
import { PrivacyPolicyEnComponent } from "../../shared/components/Policy/privacy-policy/privacy-policy-en/privacy-policy-en.component";
import { RefundPolicyComponent } from "../../shared/components/Policy/refund-policy/refund-policy.component";
import { RefundPolicyEnComponent } from "../../shared/components/Policy/refund-policy/refund-policy-en/refund-policy-en.component";
import { TermsandConditionsComponent } from "../../shared/components/Policy/termsand-conditions/termsand-conditions.component";
import { TermsandConditionsEnComponent } from "../../shared/components/Policy/termsand-conditions/termsand-conditions-en/termsand-conditions-en.component";
import { CartComponent } from "./cart/cart.component";
import { AuthGuard } from "../../core/guard/auth.guard";

export const shopRoutes: Routes = [
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  
  {
    path: "service/:id",
    component: ServiceComponent,
  },
 
  {
  path: "service/:id/:name",
    component: ServiceComponent,
  },

  {
    path: "service-category/:id",
    component: CategoryAndServiceSliderComponent,
  },
 
  {
    path: "service-category",
    component: CategoryAndServiceSliderComponent,
  },

  {
    path: "category-with/:slug",
    component: CategoryAndServiceSliderComponent,
  },

  {
    path: 'Confirm',
    component: ConfirmPaymentComponent,
  },


  // start  routing for Privacy Policy
  {
    path: 'PrivacyPolicy/ar',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'PrivacyPolicy/en',
    component: PrivacyPolicyEnComponent,
  },


  {
    path: 'RefundPolicy/ar',
    component: RefundPolicyComponent,
  },
  {
    path: 'RefundPolicy/en',
    component: RefundPolicyEnComponent,
  },

  {
    path: 'TermsandConditions/ar',
    component: TermsandConditionsComponent,
  },
  {
    path: 'TermsandConditions/en',
    component: TermsandConditionsEnComponent,
  },
];
