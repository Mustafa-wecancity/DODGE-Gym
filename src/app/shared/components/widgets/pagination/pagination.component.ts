import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import { Paginate } from '../../../../shared/interface/pagination.interface';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent extends BaseComponent   {


  @Input() public total: number;
  @Input() public currentPage: number;
  @Input() public pageSize: number;

  @Output() setPage: EventEmitter<number> = new EventEmitter();

  public paginate: Paginate; // Pagination use only

  constructor() {
    super()
   }

 

  // Detect changes
  ngOnChanges(changes: SimpleChanges) {
    this.total = changes['total'] ? changes['total'].currentValue : this.total;
    this.currentPage = changes['currentPage'] ? changes['currentPage'].currentValue : this.currentPage;
    // this.pageSize = changes['pageSize'] ? changes['pageSize'].currentValue : this.pageSize;
    this.pageSize = this.pager.maxResultCount;
    this.paginate = this.getPager(this.total,this.currentPage, this.pageSize);
  }

  // Set Page
  pageSet(page: number) {
    this.setPage.emit(page);  // Set Page Number  
    this.paginate.currentPage=page
    this.currentPage=page
  }

  // // Get Pager For Pagination
  getPagerd(totalItems: number, currentPage: number, pageSize: number) {
    // calculate total pages
    let totalPages = Number(Math.ceil(Number(totalItems) / Number(pageSize)));

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    // if (Number(currentPage) < 1) { 
    //   currentPage = 1; 
    // } else if (Number(currentPage) > Number(totalPages)) { 
    //   currentPage = Number(totalPages); 
    // }
    
    let startPage: number, endPage: number;
    if (Number(totalPages) <= Number(paginateRange)) {
      // Less than or equal to the paginateRange
      startPage = 1;
      endPage = Number(totalPages);
    } else if (Number(currentPage) <= Number(Math.floor(Number(paginateRange) / 2))) {
      // Near the beginning
      startPage = 1;
      endPage = Number(paginateRange);
    } else if (Number(currentPage) >= Number(totalPages) - Number(Math.floor(Number(paginateRange) / 2))) {
      // Near the end
      startPage = Number(totalPages) - Number(paginateRange) + 1;
      endPage = Number(totalPages);
    } else {
      // In the middle
      startPage = Number(currentPage) - Number(Math.floor(Number(paginateRange) / 2));
      endPage = Number(currentPage) + Number(Math.floor(Number(paginateRange) / 2));
    }

    // calculate start and end item indexes
    let startIndex = (Number(currentPage) - 1) * Number(pageSize);
    let endIndex = Math.min(Number(startIndex) + Number(pageSize) - 1, Number(totalItems) - 1);


    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((Number(endPage) + 1) - Number(startPage)).keys()).map(i => Number(startPage) + Number(i));

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  
  }
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 20, maxPagesToShow: number = 5) {
    const totalPages = Math.ceil(totalItems / pageSize);
  
    if (currentPage < 1) currentPage = 1;
    else if (currentPage > totalPages) currentPage = totalPages;
  
    let startPage: number, endPage: number;
    let pages: number[] = []; // تأكد من أن المصفوفة تحتوي فقط على أرقام.
  
    // إذا كانت الصفحات الإجمالية أقل من أو تساوي الحد الأقصى للصفحات المعروضة، عرض كل الصفحات
    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
      pages = Array.from({ length: endPage }, (_, i) => i + 1);
    } else {
      // عرض الصفحات القريبة من الصفحة الحالية
      const halfRange = Math.floor(maxPagesToShow / 2);
      if (currentPage <= halfRange) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + halfRange >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfRange;
        endPage = currentPage + halfRange;
      }
  
      // إضافة الصفحات في النطاق المعين
      pages.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
  
      // إضافة الصفحة الأولى إذا لم تكن موجودة بالفعل
      if (!pages.includes(1)) {
        pages.unshift(1);
      }
  
      // إضافة الصفحة الأخيرة إذا لم تكن موجودة بالفعل
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
  
    // حساب startIndex و endIndex
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }
  
  
  
  
  
  
  
}
