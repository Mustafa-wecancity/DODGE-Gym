import { Routes } from "@angular/router";
import { BundleListComponent } from "./bundle-list.component";
import { BundleComponent } from "./Bundle/bundle.component";



export const BundleRoutes: Routes = [
    {
      path: 'BundleList',
      component: BundleListComponent 
    },

    {
      path: 'BundleDetails/:id',
      component: BundleComponent,
     
    },

    {
      path: 'BundleDetails/:id/:name',
      component: BundleComponent,
     
    }
  ];