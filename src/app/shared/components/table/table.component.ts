import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, Output, EventEmitter, ViewChild, Renderer2, inject } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
// import { LoaderState } from '../../../state/loader.state';
// import { ConfirmationModalComponent } from "../modal/confirmation-modal/confirmation-modal.component";
import { TableClickedAction, TableColumn, TableConfig } from '../../interface/Models/table.interface';
import { Params, pager } from '../../interface/core.interface';
import { PaginationComponent } from '../widgets/pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { SummaryPipe } from '../../pipe/summary.pipe';
import { CurrencySymbolPipe } from '../../pipe/currency-symbol.pipe';
import { Select2Module } from 'ng-select2-component';
import { LoaderState } from '../../state/loader.state';
import { Product, ProductModel } from '../../interface/product.interface';
import { ProductState } from '../../state/product.state';
import { GenericService } from '../../Api-Services/generic.service';
import { API_ENDPOINTS } from '../../Api-Services/API_ENDPOINTS';
import { BaseComponent } from '../base/base.component';
import { ITPagination } from '../../interface/Models/Pagination/pagination';
import { GenericResponse } from '../../interface/Models/generic-response';
import { BrowserOnlyService } from '../../Api-Services/browser-only.service';
// import { AccountState } from '../../../../shared/state/account.state';
//  import { Permission } from '../../../..//shared/interface/role.interface';

@Component({
  selector: 'app-table',
  standalone:true,
  imports:[PaginationComponent,CommonModule,TranslateModule, 
    CurrencySymbolPipe,    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    Select2Module,
    TranslateModule,
    SummaryPipe  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends BaseComponent {

   @Select(LoaderState.status) loadingStatus$: Observable<boolean>;
  // @Select(AccountState.permissions) permissions$: Observable<Permission[]>;

  @Input() tableConfig: TableConfig
  @Input() hasCheckbox: boolean = true;
  @Input() hasDuplicate: boolean = true;
  @Input() topbar: boolean = true;
  @Input() pagination: boolean = true;
  @Input() loading: boolean = true;
  @Input() dateRange: boolean = false;
  
  @Output() tableChanged: EventEmitter<Params> = new EventEmitter();
  @Output() action = new EventEmitter<TableClickedAction>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() selectedItems = new EventEmitter<number[]>();
  @Select(ProductState.product) product$: Observable<ProductModel>;


  public term = new FormControl();
  public rows = [30, 50, 100];
  public tableData: Params = {
    'search': '',
    'field': '', 
    'sort': '', // current Sorting Order
    'page': 1, // current page number
    'paginate': 30, // Display per page,
  };
 
 
  public selected: number[] = [];
  public permissions: string[] = [];

  public hoveredDate: NgbDate | null = null;
	public fromDate: NgbDate | null;
	public toDate: NgbDate | null;

  constructor(@Inject(DOCUMENT) private document: Document,private store: Store, public _CustomerServiceRequest: GenericService,
  private renderer: Renderer2, config: NgbRatingConfig, 
  private calendar: NgbCalendar, 
  public formatter: NgbDateParserFormatter) { 
    super();

		config.max = 5;     // customize default values of ratings used by this component tree
		config.readonly = true;
    
    this.term.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(
        (data: string) => {
          this.onChangeTable(data, 'search');
      });
      this.GetCustomerServiceRequest();
  }

  ngOnInit() {
    this.tableChanged.emit(this.tableData);
    this.product$.subscribe(product => {
      let products = product?.data?.filter((element: Product) => {
        element.stock = element.stock_status ? `<div class="status-${element.stock_status}"><span>${element.stock_status.replace(/_/g, " ")}</span></div>` : '-';
        element.store_name = element?.store ? element?.store?.store_name : '-';
        return element;
      });
      this.tableConfig.data = product ? products : [];
      this.tableConfig.total = product ? product?.total : 0;
    });
    // this.permissions$.subscribe(permission => {
    //   this.permissions = permission?.map((value: Permission) => value?.name);
    //   const permissions = this.tableConfig?.rowActions?.map(action => action?.permission).filter(item => item != undefined);
    //   if(permissions?.length && !permissions.some(action => this.permissions?.includes(<any>action))){
    //     this.tableConfig['rowActions'] = [];
    //   }
    //   if(!this.hasPermission(['delete']) && !this.hasDuplicate) {
    //     this.hasCheckbox = false;
    //   }
    // });
    // this.loadingStatus$.subscribe(res => {
    //   if(res == false) {
    //     this.selected = [];
    //   }
    // })
  }

  hasPermission(actions?: string[]) {
    let permission = this.tableConfig?.rowActions?.find(action => actions?.includes(action.actionToPerform))?.permission;
    if (!Array.isArray(permission) && this.permissions?.includes(permission!)) {
      return true;
    } else {
      return false;
    }
  }
  
  onChangeTable(data: TableColumn | any, type: string) {
    if (type === 'sort' && data && data.sortable !== false) {
      switch (data.sort_direction) {
        case 'asc':
          data.sort_direction = 'desc';
          break;
        case 'desc':
          data.sort_direction = 'asc';
          break;
        default:
          data.sort_direction = 'desc';
          break;
      }
      this.tableData['field'] = data.dataField!;
      this.tableData['sort']  = this.tableData['sort'] === 'desc' ? 'asc' : 'desc';
    } else if (type === 'paginate') {
      this.tableData['paginate'] = (<HTMLInputElement>data.target)?.value;
    } else if (type === 'page') {
      this.tableData['page'] = data;
    } else if (type === 'search') {
      this.tableData['search'] = data;
    } else if(type = 'daterange') {
      if(data) {
        this.tableData['start_date'] = data.start_date;
        this.tableData['end_date'] = data.end_date;
      } else {
        delete this.tableData['start_date'];
        delete this.tableData['end_date'];
      }
    }
    this.renderer.addClass(this.document.body, 'loader-none');
    this.tableChanged.emit(this.tableData);
  }
  browserOnlyService = inject(BrowserOnlyService);
  onActionClicked(actionType: string, rowData: any, value?: number) {
    if(this.browserOnlyService.isBrowser()){

    this.renderer.addClass(this.document.body, 'loader-none');
    if(this.hasPermission([actionType])) {
      rowData[actionType] = value;
      this.action.emit({actionToPerform: actionType, data: rowData});
    } else {
      rowData[actionType] = value;
      this.action.emit({actionToPerform: actionType, data: rowData});
    }
  }
}

  onRowClicked(rowData: any): void {
    if(this.hasPermission(['edit', 'view'])) {
      this.rowClicked.emit(rowData);
    }
  } 

  checkUncheckAll(event: Event) {
    this.tableConfig?.data!.forEach((item: any) => {
      if(item.system_reserve != '1') { 
        item.isChecked = (<HTMLInputElement>event?.target)?.checked;
        this.setSelectedItem((<HTMLInputElement>event?.target)?.checked, item?.id);
      };
    });
  }

  onItemChecked(event: Event) {
    this.setSelectedItem((<HTMLInputElement>event.target)?.checked, Number((<HTMLInputElement>event.target)?.value));
  }

  setSelectedItem(checked: Boolean, value: Number) {
    const index = this.selected.indexOf(Number(value));
    if(checked) { 
      if(index == -1) this.selected.push(Number(value)) 
    } else {
      this.selected = this.selected.filter(id => id != Number(value));
    }
    this.selectedItems.emit(this.selected);
  }

  get deleteButtonStatus() {
    let status = false;
    this.tableConfig?.data?.filter((data: any) => {
      if(this.selected.includes(data?.id)) {
        const permission = this.tableConfig?.rowActions?.find(action => action.actionToPerform == 'delete')?.permission as string;
        if(permission && this.permissions?.includes(permission)){
          status = true;
        }
      }
    });
    return status;
  }

  get duplicateButtonStatus() {
    let status = false;
    this.tableConfig?.data?.filter((data: any) => {
      if(this.selected.includes(data?.id)) {
        const permission = this.tableConfig?.rowActions?.find(action => action.actionToPerform == 'edit')?.permission as string;
        if(permission && this.permissions?.includes(permission)){
          status = true;
        }
      }
    });
    return status;
  }

  // For Date Picker

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}

    let params = {
      start_date: `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`,
      end_date: `${this.toDate?.year}-${this.toDate?.month}-${this.toDate?.day}`
    }
    this.onChangeTable(params, 'daterange')
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'loader-none');
  }

  clearDateRange() {

    this.fromDate = null
    this.toDate = null
    let params = null
    this.onChangeTable(params, 'daterange')
  }



  CustomerServiceRequest: any ;
  public filter = {
    page: 1, // Current page number
    paginate: 12, // Display per page,
    status: 1,
  };
  GetCustomerServiceRequest(): void {
    this.pager.skipCount = (this.filter.page - 1) * this.pager.maxResultCount;

    this._CustomerServiceRequest.subscription.add(
      this._CustomerServiceRequest
        .create<GenericResponse<ITPagination<any>>, pager>(
          API_ENDPOINTS.Customer.CustomerServiceRequest,
          this.pager
        )
        .subscribe(
          (data) => {
            // this.MostOrderedServices = data.data.items;
        
            this.CustomerServiceRequest = data.data.items;
            this.totalCount = data.data.totalCount;
            this.tableConfig={
              columns: [
                { title: "No.", dataField: "no", type: "no" },
                { title: "serviceRequestDate.", dataField: "serviceRequestDate", type: "date" },
                { title: "closedDate.", dataField: "closedDate", type: "date" },
                { title: "name", dataField: "name", sortable: true, sort_direction: 'desc' },
                { title: "description", dataField: "description", sortable: true, sort_direction: 'desc' },
                { title: "customerSummary", dataField: "customerSummary", sortable: true, sort_direction: 'desc' },
                { title: "price", dataField: "sale_price", type: 'price', sortable: true, sort_direction: 'desc' },
                { title: "status", dataField: "status", type: "switch" },
              ],
              rowActions: [
                { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "product.edit"  },
                { label: "Delete", actionToPerform: "delete", icon: "ri-delete-bin-line", permission: "product.destroy"  }
              ],
              data: [] as any[],
              total: 0
            };
            this.tableConfig.data=  this.CustomerServiceRequest
            this.tableConfig.total=  this.totalCount
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }

}
