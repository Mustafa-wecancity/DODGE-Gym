import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Select } from "@ngxs/store";
import { combineLatest, Observable } from "rxjs";
import { ThemeOptionState } from "../../../shared/state/theme-option.state";
import { Option } from "../../../shared/interface/theme-option.interface";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { BlogSidebarComponent } from "../sidebar/sidebar.component";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { INews } from "../../../shared/interface/Models/Bundle/PaginationModel";
import { CustomPipeForImagesPipe } from "../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { LayoutService } from "../../../shared/Layout/layout.service";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { TranslateModule } from "@ngx-translate/core";
import { PublicService } from "../../../shared/Api-Services/public.service";

@Component({
  selector: "app-service-details",
  standalone: true,
  imports: [
    CommonModule,
    BlogSidebarComponent,
    CustomPipeForImagesPipe,
    RouterLink,
    TranslateModule,
  ],

  templateUrl: "./news-details.component.html",
  styleUrl: "./news-details.component.scss",
})
export class NewsDetailsComponent {
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  public News: INews;
  public sidebar: string = "left_sidebar";
  public filter = {
    page: 1, // Current page number
    paginate: 12, // Display per page,
    categoryId: null,
    tag: null,
    newsTitle: "",
  };
  isBrowser: boolean;

  constructor(
    private seoV2Service: SeoV2Service,
    private _NewsService: GenericService,
    private route: ActivatedRoute,
    private publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // this.route.paramMap.subscribe((params) => {
    //   const slug = params.get("id");
    //   if (slug) this.GetNews(JSON.parse(slug));
    // });

    this.isBrowser = isPlatformBrowser(this.platformId);

    combineLatest([this.route.params, this.route.queryParams]).subscribe(
      ([params, queryParams]) => {
        this.filter = {
          page: queryParams["page"] ? queryParams["page"] : 1,
          paginate: 200,
          categoryId: queryParams["categoryId"]
            ? queryParams["categoryId"]
            : "",
          tag: queryParams["tag"] ? queryParams["tag"] : "",
          newsTitle: queryParams["newsTitle"] ? queryParams["newsTitle"] : "",
        };
        this.GetNews(JSON.parse(params["id"]));
      }
    );
  }
  GetNews(id: number): void {
    this._NewsService.subscription.add(
      this._NewsService
        .getById<INews>(API_ENDPOINTS.News.GetByIdAsyncWeb, id)
        .subscribe(
          (data) => {
            if (data) {
              this.News = data;
            this.seoV2Service.setMetaImage(data?.image || '');

              this.seoV2Service.setTitle(data.title);
              this.seoV2Service.setHostUrlIndex();
 
              const lang = this.publicService.getCurrentLanguage() ?? "ar";
              this.seoV2Service.loadTranslations(lang).subscribe(
                (translations) => {
                  const metaDescription = `${translations.publishedOn} ${data.date.slice(0,10)} `;
                  this.seoV2Service.setMetaDescription(metaDescription);
                },
                (translationError) => {
                  console.error("Error loading translations", translationError);
                }
              );
              this.seoV2Service.setMetaKeywords(data.newsKeywordsList);
              this.publicService.changeTitle(this.setPathDecodeURIComponent(data.title)) 

            }
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }

  setPathDecodeURIComponent(path:string) {
    //  return decodeURIComponent(path);
     return path.replace(/[ .]/g, '-'); // Replace spaces with underscores

  }
}
