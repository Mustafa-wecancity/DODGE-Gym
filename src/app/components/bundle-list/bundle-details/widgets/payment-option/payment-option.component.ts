import { Component, Input } from '@angular/core';
 
environment
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-payment-option',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './payment-option.component.html',
  styleUrl: './payment-option.component.scss'
})
export class PaymentOptionComponent {

  @Input() option: any | null;

  public storageURL = environment.storageURL;


}
