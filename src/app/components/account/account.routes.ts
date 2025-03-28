import { Routes } from "@angular/router";
import { AccountComponent } from "./account.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { MyBundlesComponent } from "./my-bundles/my-bundles.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ReportViewerComponent } from "./report-viewer/report-viewer.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { OrdersComponent } from "./orders/orders.component";
import { CustomerServiceRequestComponent } from "./customer-service-request/customer-service-request.component";
import { ServiceManagementComponent } from "./service-management/service-management.component";

export const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'ServiceManagement/:id',
        component: ServiceManagementComponent
      },
      {
        path: 'ServiceManagement/:id/:name',
        component: ServiceManagementComponent
      },
      {
        path: 'ServiceRequest',
        component: CustomerServiceRequestComponent
      },
  
      {
        path: 'my-bundles',
        component: MyBundlesComponent
      },
 
      {
        path: 'editProfile',
        component: EditProfileComponent
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent
      },


      // {
      //   path: 'translateWeb',
      //   component: EditableTableComponent
      // },
    
      // {
      //   path: 'translateWebIos',
      //   component: EditForSrtingComponent
      // },
    
      // { path: 'report-viewer/:orderId', component: ReportViewerComponent }
    ]
  }
];