import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-delivery-information',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-delivery-information.component.html',
  styleUrl: './product-delivery-information.component.scss'
})
export class ProductDeliveryInformationComponent {


}
