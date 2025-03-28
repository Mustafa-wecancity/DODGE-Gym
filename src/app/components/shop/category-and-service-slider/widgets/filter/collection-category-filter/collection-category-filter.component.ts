import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Params } from "../../../../../../shared/interface/core.interface";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { NoDataComponent } from "../../../../../../shared/components/widgets/no-data/no-data.component";
import { SearchFilterPipe } from "../../../../../../shared/pipe/search-filter.pipe";
import { CommonModule } from "@angular/common";
import {
  ICategoryAndServices,
  IGetCategory,
  IGetCategoryWithSubCategory,
} from "../../../../../../shared/interface/Models/Category/CategoryModel";
import { ApiForImageForReport } from "../../../../../../shared/interface/Models/appSetting";
import { GenericService } from "../../../../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../../../../shared/Api-Services/API_ENDPOINTS";
import { NgbAccordionModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CustomPipeForImagesPipe } from "../../../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { AttributeService } from "../../../../../../shared/services/attribute.service";
import { GenericResponse } from "../../../../../../shared/interface/Models/generic-response";

@Component({
  selector: "app-collection-category-filter",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NoDataComponent,
    SearchFilterPipe,
    RouterLink,
    NgbModule,
    NgbAccordionModule,
    CustomPipeForImagesPipe,
  ],
  templateUrl: "./collection-category-filter.component.html",
  styleUrl: "./collection-category-filter.component.scss",
})
export class CollectionCategoryFilterComponent {
  Categories: ICategoryAndServices[] = [];
  public selectedCategory: any;
  public storageURL = ApiForImageForReport;
  public searchText: string = '';

  @Input() mainCategoryId?: number;
  @Input() filter: Params;

  public selectedCategories: string[] = [];

  constructor(
    private route: ActivatedRoute,
    public categoryService: GenericService,
    public attributeService: AttributeService,

    private router: Router
  ) {
    this.GetAllData()// get all main categories
  }

  ngOnChanges() {
    // this.selectedCategories = this.filter['category'] ? this.filter['category'].split(',') : [];
    this.selectedCategory = this.route.snapshot.params["id"];
  }

  applyFilter(event: Event) {
    const index = this.selectedCategories.indexOf(
      (<HTMLInputElement>event?.target)?.value
    ); // checked and unchecked value
    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedCategories = [(<HTMLInputElement>event?.target)?.value];
    // this.selectedCategories.push((<HTMLInputElement>event?.target)?.value); // push in array cheked value
    else this.selectedCategories.splice(index, 1); // removed in array unchecked value

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategories.length
          ? this.selectedCategories?.join(",")
          : null,
        page: 1,
      },
      queryParamsHandling: "merge", // preserve the existing query params in the route
      skipLocationChange: false, // do trigger navigation
    });
  }

  // check if the item are selected
  checked(item: string) {
    if (this.selectedCategories?.indexOf(item) != -1) {
      return true;
    }
    return false;
  }
  i = 1;

  GetAllData(): void {

    this.categoryService.subscription.add(
      this.categoryService
        .create<GenericResponse<ICategoryAndServices[]>, any>(
          API_ENDPOINTS.Category.GetAllCategoryParentAndChilde,
          {}
        )
        .subscribe(
          (data) => {
            this.Categories = data.data;
            // if( !this.selectedCategory && this.mainCategoryId  )
            //   this.selectedCategory= this.mainCategoryId;
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }

  changeIds(newId: string) {
    // this.router.navigate(['../', newId], {
    //   relativeTo: this.route,
    //   queryParams: {
    //     category: this.selectedCategories.length ? this.selectedCategories.join(",") : null,
    //     page: 1
    //   },
    //   queryParamsHandling: 'merge',
    //   skipLocationChange: false
    // });

    this.router.navigate(["service-category", newId], {
      relativeTo: this.route,
      queryParams: {
        category: null,
        page: 1,
      },
      queryParamsHandling: "merge",
      skipLocationChange: false,
    });
  }

  changeId(newId: string = "0") {
    this.router
      .navigate(
        ["/service-category", newId], // تحديث الـ pathParams
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

  selectCategory(category: ICategoryAndServices): void {
    this.selectedCategory = category.id;
  }
  isExpanded(category: ICategoryAndServices): boolean {
    // If there are no subcategories, return false
    if (!category) {
      return false;
    }
    if (category.id == this.selectedCategory) {
      return true;
    }
    // If the category has subcategories, return true if the subcategory is expanded

    // Check if any subcategory matches the selectedCategory
    return category.id == this.selectedCategory;
  }
  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }
}
