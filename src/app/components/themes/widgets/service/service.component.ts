import { Component, Input } from '@angular/core';
import { Services } from '../../../../shared/interface/theme.interface';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {

  @Input() data: Services[];

  public storageURL = environment.storageURL;

}
