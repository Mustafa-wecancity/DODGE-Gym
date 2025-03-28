import { Component, Input } from "@angular/core";
import { Params } from "../../../../../shared/interface/core.interface";
import { CommonModule } from "@angular/common";
import { CollectionSortComponent } from "../collection-sort/collection-sort.component";
import { SkeletonProductBoxComponent } from "../../../../../shared/components/widgets/product-box/widgets/skeleton-product-box/skeleton-product-box.component";
import { NoDataComponent } from "../../../../../shared/components/widgets/no-data/no-data.component";
import { IProductesList } from "../../../../../shared/interface/Models/Category/CategoryModel";
import { ServicesBoxComponent } from "./services-box/services-box.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CategoryPaginateComponent } from "../category-paginate/category-paginate.component";
import { TitleComponent } from "../../../../../shared/components/widgets/title/title.component";

@Component({
  selector: "app-service-category",
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    CollectionSortComponent,
    SkeletonProductBoxComponent,
    NoDataComponent,
    CategoryPaginateComponent,
    ServicesBoxComponent,
    TitleComponent,
  ],
  templateUrl: "./category-service.component.html",
  styleUrl: "./category-service.component.scss",
})
export class CategoryServiceProdctComponent {
  @Input() filter: Params;
  @Input() gridCol: string;
  @Input() title?: string = "";
  @Input() SubServiceCategoryList: IProductesList[];

  public gridClass: string =
    "row g-sm-4 g-3 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 product-list-section";

  public skeletonItems = Array.from({ length: 40 }, (_, index) => index);

  constructor() {}

  setGridClass(gridClass: string) {
    this.gridClass = gridClass;
  }
}
