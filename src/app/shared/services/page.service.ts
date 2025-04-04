import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Params } from "../interface/core.interface";
import { ContactUsModel, FaqModel, Page, PageModel } from "../interface/page.interface";
import { StoresModel } from "../interface/store.interface";

@Injectable({
  providedIn: "root",
})
export class PageService {

  public skeletonLoader: boolean = false;
  
  constructor(private http: HttpClient) {}

  getPages(payload?: Params): Observable<PageModel> {
    return this.http.get<PageModel>(`${environment.URL}/page.json`, { params: payload });
  }

  getPageBySlug(slug: string): Observable<Page> {
    return this.http.get<Page>(`${environment.URL}/page/slug/${slug}`);
  }

  getFaqs(): Observable<FaqModel> {
    return this.http.get<FaqModel>(`${environment.URL}/faq.json`);
  }

  getStores(payload?: Params): Observable<StoresModel> {
    return this.http.get<StoresModel>(`${environment.URL}/store.json`, { params: payload });
  }
  
}
