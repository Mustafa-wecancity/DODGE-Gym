import { Component, Input } from "@angular/core";
import { Select } from "@ngxs/store";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { Observable } from "rxjs";
import { ThemeOptionState } from "../../../../../shared/state/theme-option.state";
import { Option } from "../../../../../shared/interface/theme-option.interface";
import { CommonModule } from "@angular/common";
import { ICategoryAndServices } from "../../../../../shared/interface/Models/Category/CategoryModel";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../../../../shared/components/widgets/button/button.component";
import { NoDataComponent } from "../../../../../shared/components/widgets/no-data/no-data.component";
import { CustomPipeForImagesPipe } from "../../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { GenericService } from "../../../../../shared/Api-Services/generic.service";
import { AttributeService } from "../../../../../shared/services/attribute.service";
import { API_ENDPOINTS } from "../../../../../shared/Api-Services/API_ENDPOINTS";
import { PublicService } from "../../../../../shared/Api-Services/public.service";

@Component({
  selector: "app-sub-categories",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    CarouselModule,
    CustomPipeForImagesPipe,
    NoDataComponent,
  ],
  templateUrl: "./sub-categories.component.html",
  styleUrl: "./sub-categories.component.scss",
})
export class subCategoriesComponent {
  @Input() style: string = "vertical";
  @Input() image: string;
  @Input() theme: string = "paris";
  @Input() title: string;
  @Input() sliderOption: OwlOptions;
  @Input() SubCategoryList: ICategoryAndServices[] | null = [];
  selectedCategory: any;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  selectCategory(category: number): void {
    if (this.selectedCategory == category) this.selectedCategory = null;
    else {
    const language = this.publicService.getCurrentLanguage() ?? 'ar';
    this.selectedCategory = category;
      this.router
        .navigate(
          [`/${language}/service-category`, category], // تحديث الـ pathParams
          {
            queryParams: {
              category: null,
              page: 1,
            },
            queryParamsHandling: "merge", // دمج الـ queryParams مع الـ URL الحالي
            skipLocationChange: false, // اجعلها `false` لتحديث الـ URL بدون إعادة تحميل
            replaceUrl: true, // هذا يقوم بتحديث الـ URL الحالي بدون إضافة خطوة جديدة إلى الـ history
          }
        )
        .then((success) => {
          if (success) {
            console.log("Navigation successful");
          } else {
            console.error("Navigation failed");
          }
        })
        .catch((err) => {
          console.error("Navigation error:", err);
        });

      }
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public categoryService: GenericService, private publicService: PublicService
  ) {
    // this.selectedCategory  = this.route.snapshot.params['category'];
    this.GetAllData();
  }

  GetAllData(): void {
    this.categoryService.subscription.add(
      this.categoryService
        .getAll<ICategoryAndServices>(
          API_ENDPOINTS.Category.GetAllCategoryParentAndChilde
        )
        .subscribe(
          (data) => {
            this.SubCategoryList = data;
            // if( !this.selectedCategory && this.mainCategoryId  )
            //   this.selectedCategory= this.mainCategoryId;
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }
}
