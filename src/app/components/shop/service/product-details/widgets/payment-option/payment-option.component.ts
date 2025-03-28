import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { environment } from '../../../../../../../environments/environment.development';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-option',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './payment-option.component.html',
  styleUrl: './payment-option.component.scss'
})
export class PaymentOptionComponent {

 
  public storageURL = environment.storageURL;


}
