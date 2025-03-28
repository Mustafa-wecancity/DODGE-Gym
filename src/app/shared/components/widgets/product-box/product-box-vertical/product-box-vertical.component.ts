import { Component, Input } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';

@Component({
  selector: 'app-product-box-vertical',
  standalone: true,
  imports: [RouterModule, CurrencySymbolPipe],
  providers: [CurrencySymbolPipe],
  templateUrl: './product-box-vertical.component.html',
  styleUrl: './product-box-vertical.component.scss'
})
export class ProductBoxVerticalComponent {

  @Input() product: Product;
  
}
