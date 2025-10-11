import { Routes } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us.component";
import { Error404Component } from "./error404/error404.component";
import { ContactUs } from "../../shared/action/page.action";
import { FaqComponent } from "./faq/faq.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";

export const pageRoutes: Routes = [
 
  {
    path: '404',
    component: Error404Component,
  },
 
  {
    path: 'about-us',
    component: AboutUsComponent
  },
   
  {
    path: 'contact',
    component: ContactUsComponent
  },
     
  {
    path: 'faq',
    component: FaqComponent
  },
 
];