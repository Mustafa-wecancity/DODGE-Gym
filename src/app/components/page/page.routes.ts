import { Routes } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us.component";
import { Error404Component } from "./error404/error404.component";

export const pageRoutes: Routes = [
 
  {
    path: '404',
    component: Error404Component,
  },
 
  {
    path: 'about-us',
    component: AboutUsComponent
  },
 
];