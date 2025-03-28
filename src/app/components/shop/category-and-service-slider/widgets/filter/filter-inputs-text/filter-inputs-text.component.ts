import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ISlider } from "../../../../../../shared/interface/Models/Category/CategoryModel";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-filter-inputs-text",
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: "./filter-inputs-text.component.html",
  styleUrl: "./filter-inputs-text.component.scss",
})
export class FilterInputsTextComponent implements OnInit, OnChanges {
  @Input() filter: Params;
  @Input() sliderInput: ISlider;
  fromPrice: number = 0;
  toPrice: number = 0;
  fromPoint: number = 0;
  toPoint: number = 0;
  public searchText: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.searchText = this.filter["serviceTitle"];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["sliderInput"] && !changes["sliderInput"].isFirstChange()) {
    }
  }

  applyFilter() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        serviceTitle: this.searchText ? this.searchText : null,
        page: 1,
      },
      queryParamsHandling: "merge", // preserve the existing query params in the route
      skipLocationChange: false, // do trigger navigation
    });
  }

  clearFilter() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        toPrice: null,
        fromPrice: null,
        toPoint: null,
        fromPoint: null,
        serviceTitle: null,
      },
      queryParamsHandling: "merge", // preserve the existing query params in the route
      skipLocationChange: false, // do trigger navigation
    });
  }
}
