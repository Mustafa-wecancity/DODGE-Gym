import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
 import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ISlider } from '../../../../shared/interface/Models/Category/CategoryModel';

@Component({
  selector: 'app-filter-inputs-text',
  standalone: true,
  imports: [
    FormsModule,TranslateModule
  ],
  templateUrl: './filter-inputs-text.component.html',
  styleUrl: './filter-inputs-text.component.scss'
})
export class FilterInputsTextForNewsComponent implements OnInit, OnChanges {
  @Input() filter: Params;
 

  public searchText: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
   this.searchText= this.filter['newsTitle'];

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["filter"] && !changes["filter"].isFirstChange()) {


    }
    

  }

 

 
 

  applyFilter() {
 
    this.router.navigate(
      ['/newsList'],  // تحديث الـ pathParams
      {
        queryParams: {
          category:  null,
          newsTitle: this.searchText ? this.searchText : null,
          tag:  null,
          page: 1
        },
        queryParamsHandling: 'merge',  // دمج الـ queryParams مع الـ URL الحالي
        skipLocationChange: false,  // اجعلها `false` لتحديث الـ URL بدون إعادة تحميل
        replaceUrl: true  // هذا يقوم بتحديث الـ URL الحالي بدون إضافة خطوة جديدة إلى الـ history
      }
    )
  }
  clearFilter() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        newsTitle: null,
        category:  null,
        tag:  null,
        page: 1
      },
      queryParamsHandling: "merge", // preserve the existing query params in the route
      skipLocationChange: false, // do trigger navigation
    });
 
  }
}
