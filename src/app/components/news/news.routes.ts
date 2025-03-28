import { Routes } from "@angular/router";
 import { NewsListComponent } from "./news.component";
import { NewsDetailsComponent } from "./news-details/news-details.component";
 
export const newsRoutes: Routes = [
  {
    path: 'newsList',
    component: NewsListComponent 
  },
  {
    path: 'newsList/:id',
    component: NewsListComponent 
  },
  {
    path: 'newsDetails/:id',
    component: NewsDetailsComponent,
  },
  {
    path: 'newsDetails/:id/:name',
    component: NewsDetailsComponent,
  }
];