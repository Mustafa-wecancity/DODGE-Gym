import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { FormsModule } from "@angular/forms";
import { NoDataComponent } from "../../../../../../shared/components/widgets/no-data/no-data.component";
import { TranslateModule } from "@ngx-translate/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ButtonComponent } from "../../../../../../shared/components/widgets/button/button.component";
import { ISlider } from "../../../../../../shared/interface/Models/Category/CategoryModel";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-filter-all-inputs",
  standalone: true,
  imports: [
    TranslateModule,
    NgxSliderModule,
    ButtonComponent,
    FormsModule,
    NoDataComponent,
    CommonModule,
  ],
  templateUrl: "./filter-all-inputs.component.html",
  styleUrls: ["./filter-all-inputs.component.scss"],
})
export class FilterAllInputsComponent implements OnInit, OnChanges {
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
    if (this.sliderInput) {
      this.fromPoint = this.sliderInput.fromPoint;
      this.toPoint = this.sliderInput.toPoint;
      this.fromPrice = this.sliderInput.fromPrice;
      this.toPrice = this.sliderInput.toPrice;
      this.updateSliderOptions();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["sliderInput"] && !changes["sliderInput"].isFirstChange()) {
      this.fromPoint = this.sliderInput.fromPoint;
      this.toPoint = this.sliderInput.toPoint;
      this.fromPrice = this.sliderInput.fromPrice;
      this.toPrice = this.sliderInput.toPrice;
      this.updateSliderOptions();
    }
  }

  options: Options = {
    floor: 1,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min P:</b>" + value;
        case LabelType.High:
          return "<b>Max price:</b>" + value;
        default:
        return '' + value;

      }
    },
  };

  optionsTow: Options = {
    floor: 1,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>From Point:</b> ● " + value;
        case LabelType.High:
          return "<b>ToPoint:</b> ● " + value;
        default:
          return '' + value;
      }
    },
  };

  updateSliderOptions() {
    setTimeout(() => {
      this.options = {
        ...this.options,
        ceil: this.toPrice,
      };
      this.optionsTow = {
        ...this.optionsTow,
        ceil: this.toPoint,
      };
      this.cdr.detectChanges();
    }, 0);
  }

  applyFilter() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        toPrice: this.toPrice ? this.toPrice : null,
        fromPrice: this.fromPrice ? this.fromPrice : null,
        toPoint: this.toPoint ? this.toPoint : null,
        fromPoint: this.fromPoint ? this.fromPoint : null,
        // serviceTitle: this.searchText ? this.searchText : null,
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
