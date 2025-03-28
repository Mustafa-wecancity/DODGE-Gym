import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const dateParts = value.trim().split(this.DELIMITER);
      if (dateParts.length === 3) {
        return {
          day: +dateParts[0],
          month: +dateParts[1],
          year: +dateParts[2]
        };
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? `${this.padNumber(date.day)}${this.DELIMITER}${this.padNumber(date.month)}${this.DELIMITER}${date.year}` : '';
  }

  private padNumber(value: number): string {
    if (value < 10) {
      return `0${value}`;
    }
    return value.toString();
  }
}
