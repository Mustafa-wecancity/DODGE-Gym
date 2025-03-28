import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guard/auth.guard";
import { ScrollPositionGuard } from "../../core/guard/scroll.guard";

export const content: Routes = [
    {
        path: "",
        loadChildren: () => import('../../components/themes/themes.routes').then(r => r.themeRoutes)
    },
    {
        path: "auth",
        loadChildren: () => import("../../components/auth/auth.routes").then(r => r.authRoutes),
 
         canActivateChild : [AuthGuard],
    },

    {
        path: "account",
        loadChildren: () => import("../../components/account/account.routes").then(r => r.accountRoutes),
        canActivate : [AuthGuard]
    },
    {
        path: "",
        loadChildren: () => import('../../components/shop/shop.routes').then(r => r.shopRoutes),
    canActivate: [ScrollPositionGuard],

        
    },
 
    {
        path: "",
        loadChildren: () => import('../../components/news/news.routes').then(r => r.newsRoutes),
    canActivate: [ScrollPositionGuard],

    },
 
    {
        path: "",
        loadChildren: () => import('../../components/bundle-list/Bundle.routes').then(r => r.BundleRoutes),
    canActivate: [ScrollPositionGuard],

    },
    {
        path: "",
        loadChildren: () => import('../../components/page/page.routes').then(r => r.pageRoutes),
    canActivate: [ScrollPositionGuard],

    },
]