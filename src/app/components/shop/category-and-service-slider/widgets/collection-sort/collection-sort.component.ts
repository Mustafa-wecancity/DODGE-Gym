import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
   Select2Module,
 } from "ng-select2-component";
import { Params } from "../../../../../shared/interface/core.interface";
import { AttributeService } from "../../../../../shared/services/attribute.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { NgSelectModule } from "@ng-select/ng-select";
 import { PublicService } from "../../../../../shared/Api-Services/public.service";

@Component({
  selector: "app-collection-sort",
  standalone: true,
  imports: [TranslateModule, NgSelectModule,Select2Module],
  templateUrl: "./collection-sort.component.html",
  styleUrl: "./collection-sort.component.scss",
})
export class CollectionSortComponent {
  @Input() filter: Params;
  @Input() gridCol: string;

  @Output() setGridClass: EventEmitter<string> = new EventEmitter();
  @Output() showFilter: EventEmitter<boolean> = new EventEmitter();

  //   Sortby : "Title" or "Price"
  // Sort direction: "ASC" or "DESC"
  public sorting: any 
  public text: any 
  public selectedGrid: string = "collection_4_grid";
  public class: string =
    "row g-sm-4 g-3 row-cols-xl-4 row-cols-md-3 row-cols-2 product-list-section";
  public gridArray = [
    "collection_3_grid",
    "collection_4_grid",
    "collection_5_grid",
    "collection_list_view",
  ];

  constructor(private translate: TranslateService,
    private route: ActivatedRoute,
    private attributeService: AttributeService,
    private router: Router,
    private publicService: PublicService,
  ) {
    this.setGridClass.emit(this.class);
  }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

 
    this.initializeSorting();
 
}
  ngOnChanges(changes: SimpleChanges) {
    let layout = changes["filter"]?.currentValue.layout;
    let gridCol = changes["gridCol"]?.currentValue;
    if (this.gridArray.includes(gridCol)) {
      this.selectedGrid = String(this.grid(gridCol));
    }
    if (this.gridArray.includes(layout)) {
      this.grid(layout);
    }
    this.text=changes["filter"]?.currentValue.sortDirection;
  }

  grid(value: string) {
    if (this.gridArray.includes(value)) {
      if (value == "collection_3_grid")
        this.class =
          "row g-sm-4 g-3 product-list-section row-cols-md-3 row-cols-2";
      else if (value == "collection_4_grid")
        this.class =
          "row g-sm-4 g-3 product-list-section row-cols-xl-4 row-cols-md-3 row-cols-2";
      else if (value == "collection_5_grid")
        this.class =
          "row g-sm-4 g-3 product-list-section row-cols-xxl-5 row-cols-xl-4 row-cols-md-3 row-cols-2";
      else if (value == "collection_list_view")
        this.class = "row g-sm-4 g-3 product-list-section list-style";

      this.selectedGrid = value;
      this.setGridClass.emit(this.class);
    }
  }

  // SortBy Filter
  sortByFilter(data: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy:
          data && data.options[0]?.column ? data.options[0]?.column : null,
        sortDirection: data && data.value ? data.value : null,
      },
      queryParamsHandling: "merge", // preserve the existing query params in the route
      skipLocationChange: false, // do trigger navigation
    });
  }

  openOffCanvasMenu() {
    this.attributeService.offCanvasMenu = true;
  }

  openFilter(value: boolean) {
    this.attributeService.offCanvasMenu = value;
  }
  initializeSorting() {
     const lang =this.publicService.getCurrentLanguage()??'ar'
    if(lang =='ar'){
      this.sorting = [
        {
          value: "",
          column: "",
          label: "الكل",
        },
        {
          value: "asc",
          column: "TitleAr",
          label: "العنوان من  الألف إلى الياء",
        },
        {
          value: "desc",
          column: "TitleAr",
          label: "العنوان من الياء إلى  الألف",
        },
        {
          value: "asc_",
          column: "Price",
          label:"السعر من الأقل إلى الأعلى",
        },
        {
          value: "desc_",
          column: "Price",
          label:  "السعر من الأعلى إلى الأدنى",
        },
      ];
    }
    else{
      this.sorting = [
        {
          value: "",
          column: "",
          label: this.translate.instant('all'),
        },
        {
          value: "asc",
          column: "Title",
          label: this.translate.instant('A - Z Title'),
        },
        {
          value: "desc",
          column: "Title",
          label: this.translate.instant('Z - A Title'),
        },
        {
          value: "asc_",
          column: "Price",
          label: this.translate.instant('Low - High Price'),
        },
        {
          value: "desc_",
          column: "Price",
          label: this.translate.instant('High - Low Price'),
        },
      ];
    }
  }
}
