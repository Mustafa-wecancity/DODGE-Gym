import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { CommonModule } from '@angular/common';
import { Bundle, ServicesHome } from '../../../../../../shared/interface/Models/Bundle/PaginationModel';
import { RelatedServicesBoxComponent } from '../services-box/services-box.component';
import { ServicesBoxVerticalComponent } from '../services-box-vertical/services-box-vertical.component';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency-symbol.pipe';
import { CustomPipeForImagesPipe } from '../../../../../../shared/pipe/custom-pipe-for-images-pipe.pipe';

@Component({
    selector: 'app-trending-products',
    standalone: true,
    providers: [CurrencySymbolPipe, CustomPipeForImagesPipe],
    templateUrl: './trending-products.component.html',
    styleUrl: './trending-products.component.scss',
    imports: [CommonModule, TranslateModule, RelatedServicesBoxComponent, ServicesBoxVerticalComponent, RouterModule, CurrencySymbolPipe, CustomPipeForImagesPipe]
})
export class TrendingProductsComponent {


  public relatedProducts: Product[] = [];
  @Input() TrendingServices:  ServicesHome[] = [];
  @Input() Bundle: Bundle[] = [];

  ngOnInit() {

  }

}
