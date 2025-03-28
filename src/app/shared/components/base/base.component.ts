// import { Component, OnInit } from '@angular/core';
// import { pager } from '../../interface/core.interface';
// import { FormControl } from '@angular/forms';
// import { formatDate } from '@angular/common';

// @Component({
//   standalone:true, 
//   selector: 'app-base',
//   template: ''
// })
// export class BaseComponent {
//   addItemCount = 0;
//   firstPage = { page: 1 };
//   totalCount = 0;
//   pageNumber = 1;
//   pager: pager = {
//     maxResultCount:24,
//     skipCount: 0
//   };




//   constructor() { }

//   // Date and time
//   expirationDateNow = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
//   expiration = formatDate(new Date().setUTCHours(24), 'yyyy-MM-dd', 'en-US');
//   licenseIssue = formatDate(new Date().setUTCHours(-24), 'yyyy-MM-dd', 'en-US');
//   DateTime = formatDate(
//     new Date().setUTCHours(24),
//     "yyyy-MM-dd'T'HH:mm",
//     'en-US'
//   );

//   getDateUtc(licenseExpirationDate: any) {
//     const date1: Date = new Date(
//       formatDate(licenseExpirationDate, 'yyyy-dd-MM', 'en-US')
//     );
//     const currentDate: Date = new Date();

//     if (date1.getTime() < currentDate.getTime()) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   dateConverterPlus18(): string {
//     const date = new Date().getUTCFullYear() - 18;
//     const maxDate = new Date().setUTCFullYear(date);
//     return  formatDate(maxDate, 'yyyy-MM-dd', 'en-US');
//   }

//   dateConverterPlus18s(): string {
//     const today = new Date();
//     const eighteenYearsAgo = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
//     return eighteenYearsAgo.toISOString().slice(0, 10);
//   }


//   public whitespaceValidator(control: FormControl) {
//     const regex = /^\S.*\S$/;
//     const isValid = regex.test(control.value);
//     return isValid ? null : { whitespace: true };
//   }

// }

 
import { Component } from '@angular/core';
import { pager } from '../../interface/core.interface';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-base',
  template: ''
})
export class BaseComponent {
  addItemCount = 0;
  firstPage = { page: 1 };
  totalCount = 0;
  pageNumber = 1;

  pager: pager = {
    maxResultCount: 24,
    skipCount: 0
  };

  // Current dates in various formats
  expirationDateNow = this.formatCurrentDate('yyyy-MM-dd');
  expiration = this.formatFutureDate(24, 'yyyy-MM-dd');
  licenseIssue = this.formatFutureDate(-24, 'yyyy-MM-dd');
  dateTime = this.formatFutureDate(24, "yyyy-MM-dd'T'HH:mm");

  constructor() {}

  /**
   * Helper to format the current date.
   */
  private formatCurrentDate(format: string): string {
    return formatDate(new Date(), format, 'en-US');
  }

  /**
   * Helper to format a future or past date based on hours offset.
   */
  private formatFutureDate(hours: number, format: string): string {
    const date = new Date();
    date.setUTCHours(date.getUTCHours() + hours);
    return formatDate(date, format, 'en-US');
  }

  /**
   * Check if the input date is in the future relative to the current date.
   */
  getDateUtc(licenseExpirationDate: any): boolean {
    try {
      const inputDate = new Date(licenseExpirationDate);
      const currentDate = new Date();
      return inputDate.getTime() >= currentDate.getTime();
    } catch (error) {
      console.error('Invalid date format:', licenseExpirationDate);
      return false;
    }
  }

  /**
   * Returns the date for 18 years ago from the current year.
   */
  dateConverterPlus18(): string {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear() - 18);
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  /**
   * Returns the date for 50 years ago.
   */
  dateConverterPlus18s(): string {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear() - 50);
    return date.toISOString().slice(0, 10);
  }

  /**
   * Validator to check for leading/trailing whitespace in a form control value.
   */
  public whitespaceValidator(control: FormControl) {
    const regex = /^\S.*\S|\S$/; // Allows single words and input without trailing spaces
    const isValid = control.value ? regex.test(control.value) : false;
    return isValid ? null : { whitespace: true };
  }
  // protected ngUnsubscribe: Subject<void> = new Subject<void>();
  // ngOnDestroy(): void {
  //   console.log(this.ngUnsubscribe)
  //   this.ngUnsubscribe.next();
  //   this.ngUnsubscribe.complete();
  // }
  
}
