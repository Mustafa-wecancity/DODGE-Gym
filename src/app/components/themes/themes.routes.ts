import { Routes } from "@angular/router";
import { ThemesComponent } from "./themes.component";
import { HomeResolver } from "../../shared/resolvers/home.resolver";

export const themeRoutes: Routes = [
  {
    path: 'home',
    component: ThemesComponent
  },
  {
    path: '',
    component: ThemesComponent
  },
  // {
  //   path: '',
  //   component: ThemesComponent,
  //   runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  //   resolve: {
  //     data: HomeResolver
  //   }
  // }
];