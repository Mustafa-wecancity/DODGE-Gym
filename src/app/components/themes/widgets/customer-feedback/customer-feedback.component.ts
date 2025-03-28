import { Component, Input } from "@angular/core";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

import * as data from "../../../../shared/data/owl-carousel";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { NoDataComponent } from "../../../../shared/components/widgets/no-data/no-data.component";
import { ICuestomerFeedback } from "../../../../shared/interface/Models/Bundle/PaginationModel";
import { CustomPipeForImagesPipe } from "../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { SkeletonBlogComponent } from "../../../news/skeleton-blog/skeleton-blog.component";
import { GenericService } from "../../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../../shared/Api-Services/API_ENDPOINTS";


@Component({
  selector: 'app-customer-feedback',
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

  templateUrl: './customer-feedback.component.html',
  styleUrl: './customer-feedback.component.scss'
})
export class CustomerFeedbackComponent  {
    sliderOption: OwlOptions=data.bannerSlider_;
  @Input() description: boolean;
  // @Input() News: IRecentNewsHome[] = [];
  public CuestomerFeedback: ICuestomerFeedback[] = [];
  // public imageDefault = environment.imageDefault;
  public skeletonItems = Array.from({ length: 5 }, (_, index) => index);
  public blogOption = data.customOptionsItem3;

  constructor(public _homeService: GenericService) {
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
    const params = { topCount: 10 };

    this._homeService.subscription.add(
      this._homeService
        .getAll<ICuestomerFeedback>(
          API_ENDPOINTS.Home.GetCustomerFeedbackForList,
      params
        )
        .subscribe(
          (data) => {
            this.CuestomerFeedback = data;
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }
}
