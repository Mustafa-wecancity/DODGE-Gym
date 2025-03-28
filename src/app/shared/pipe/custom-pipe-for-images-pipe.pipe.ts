import { Pipe, PipeTransform } from '@angular/core';
import { ApiForImageForReport } from '../interface/Models/appSetting';
import { environment } from '../../../environments/environment.development';
@Pipe({
  name: 'customPipeForImages',
  standalone: true

})
export class CustomPipeForImagesPipe implements PipeTransform {

  transform(contactImage: string): string {
    return environment.serverFirstHalfOfImageUrl+contactImage ;

  }

}
