import { Component, Input } from "@angular/core";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

import * as data from "../../../../shared/data/owl-carousel";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { NoDataComponent } from "../../../../shared/components/widgets/no-data/no-data.component";
import { IRecentNewsHome } from "../../../../shared/interface/Models/Bundle/PaginationModel";
import { CustomPipeForImagesPipe } from "../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { SkeletonBlogComponent } from "../../../news/skeleton-blog/skeleton-blog.component";
import { GenericService } from "../../../../shared/Api-Services/generic.service";
import { ITPagination } from "../../../../shared/interface/Models/Pagination/pagination";
import { pager } from "../../../../shared/interface/core.interface";
import { API_ENDPOINTS } from "../../../../shared/Api-Services/API_ENDPOINTS";
import { BaseComponent } from "../../../../shared/components/base/base.component";
import { GenericResponse } from "../../../../shared/interface/Models/generic-response";

@Component({
  selector: "app-news",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    CarouselModule,
    NoDataComponent,
    SkeletonBlogComponent,
    CustomPipeForImagesPipe,
  ],

  templateUrl: "./news.component.html",
  styleUrl: "./news.component.scss",
})
export class NewsComponent extends BaseComponent {
  @Input() sliderOption: OwlOptions;
  @Input() description: boolean;
  // @Input() News: IRecentNewsHome[] = [];
  public News: IRecentNewsHome[] = [];
  // public imageDefault = environment.imageDefault;
  public skeletonItems = Array.from({ length: 5 }, (_, index) => index);
  public blogOption = data.customOptionsItem3;

  constructor(public _homeService: GenericService) {
    super();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.get();
  }
  ngOnChanges() {}
  setPathDecodeURIComponent(path: string) {
    //  return decodeURIComponent(path);
    return path.replace(/[ .]/g, "-"); // Replace spaces with underscores
  }

  get() {
    this._homeService.subscription.add(
      this._homeService
        .create<GenericResponse<ITPagination<IRecentNewsHome>>, pager>(
          API_ENDPOINTS.Home.RecentNews,
          this.pager
        )
        .subscribe(
          (data) => {
            this.News = data.data.items;
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }
}
