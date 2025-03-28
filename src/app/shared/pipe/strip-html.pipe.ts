import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml',
  standalone: true

})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = value;
    return tempElement.textContent || tempElement.innerText || '';
  }
}
