import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Select } from "@ngxs/store";
import { combineLatest, Observable } from "rxjs";
import { ThemeOptionState } from "../../shared/state/theme-option.state";
import { Option } from "../../shared/interface/theme-option.interface";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { SummaryPipe } from "../../shared/pipe/summary.pipe";
import { SkeletonBlogComponent } from "./skeleton-blog/skeleton-blog.component";
import { PaginationComponent } from "../../shared/components/widgets/pagination/pagination.component";
import { NoDataComponent } from "../../shared/components/widgets/no-data/no-data.component";
import { BlogSidebarComponent } from "./sidebar/sidebar.component";
import { GenericResponse } from "../../shared/interface/Models/generic-response";
import { ITPagination } from "../../shared/interface/Models/Pagination/pagination";
import { API_ENDPOINTS } from "../../shared/Api-Services/API_ENDPOINTS";
import { BaseComponent } from "../../shared/components/base/base.component";
import { GenericService } from "../../shared/Api-Services/generic.service";
import { CustomPipeForImagesPipe } from "../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { INews } from "../../shared/interface/Models/Bundle/PaginationModel";
import { LayoutService } from "../../shared/Layout/layout.service";
import { SeoV2Service } from "../../shared/services/seo-v2.service";
import { AttributeService } from "../../shared/services/attribute.service";
import { PublicService } from "../../shared/Api-Services/public.service";

@Component({
  selector: "app-news",
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    CommonModule,
    SummaryPipe,
    SkeletonBlogComponent,
    PaginationComponent,
    NoDataComponent,
    BlogSidebarComponent,
    CustomPipeForImagesPipe,
  ],
  templateUrl: "./news.component.html",
  styleUrl: "./news.component.scss",
})
export class NewsListComponent extends BaseComponent {
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  public filter = {
    page: 1, // Current page number
    paginate: 12, // Display per page,
    categoryId: null,
    tag: null,
    newsTitle: "",
  };
  id: number;
  mainCategoryId: number;
  public News: INews[] = [];
  public skeletonItems = Array.from({ length: 9 }, (_, index) => index);

  public style: string = "list_view";
  public sidebar: string = "left_sidebar";
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private _NewsService: GenericService,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    public attributeService: AttributeService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    super();
    // this.GetNews();
    this.seo();
    this.isBrowser = isPlatformBrowser(this.platformId);

    combineLatest([this.route.params, this.route.queryParams]).subscribe(
      ([params, queryParams]) => {
        this.id = params["id"];
        this.filter = {
          page: queryParams["page"] ? queryParams["page"] : 1,
          paginate: 200,
          categoryId: queryParams["categoryId"]
            ? queryParams["categoryId"]
            : "",
          tag: queryParams["tag"] ? queryParams["tag"] : "",
          newsTitle: queryParams["newsTitle"] ? queryParams["newsTitle"] : "",
        };
        this.GetNews();
      }
    );
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.GetNews();
  }
  GetNews(): void {
    this.pager.skipCount = (this.filter.page - 1) * this.pager.maxResultCount;

    let dataPost: { [key: string]: any } = {
      maxResultCount: this.pager.maxResultCount,
      skipCount: (+this.filter["page"] - 1) * this.pager.maxResultCount,
      keywordId: this.filter["tag"] ? +this.filter["tag"] : null,
      categoryId: this.id ? +this.id : null,

      newsTitle: this.filter["newsTitle"] ? this.filter["newsTitle"] : null,
    };

    // Remove properties with null values
    dataPost = Object.fromEntries(
      Object.entries(dataPost).filter(([_, v]) => v !== null)
    );

    this._NewsService.subscription.add(
      this._NewsService
        .create<GenericResponse<ITPagination<INews>>, any>(
          API_ENDPOINTS.News.GetLocalizedNewsList,
          dataPost
        )
        .subscribe(
          (data) => {
            // this.MostOrderedServices = data.data.items;

            this.News = data.data.items;
            this.totalCount = data.data.totalCount;
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }
  private seo() {
    // this.seoV2Service.setMetaImage( '' );
   const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(translations.NewsList.header.Title);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.NewsList.header.meta_description
      );
      this.seoV2Service.setMetaImageStatic("assets/images/pageList/News.jpg");

      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.NewsList.header.meta_keywords
        )
      );
      
      // this.seoService.setMetaTags(translations);
    });
  }
  openOffCanvasMenu() {
    this.attributeService.offCanvasMenu = true;
  }

  openFilter(value: boolean) {
    this.attributeService.offCanvasMenu = value;
  }

  setPathDecodeURIComponent(path:string) {
    //  return decodeURIComponent(path);
     return path.replace(/[ .]/g, '-'); // Replace spaces with underscores

  }

}
