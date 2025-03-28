import { Component, Input } from '@angular/core';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../button/button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../../interface/product.interface';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { DeleteWishlist } from '../../../../action/wishlist.action';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-classic-product-box',
  standalone: true,
  imports: [CurrencySymbolPipe, RouterModule, NgbModule, TranslateModule,
             ButtonComponent, 
  ],
  templateUrl: './classic-product-box.component.html',
  styleUrl: './classic-product-box.component.scss'
})
export class ClassicProductBoxComponent {

  @Input() product: Product;
  @Input() class: string;
  @Input() close: boolean;
  
  constructor(config: NgbRatingConfig, private store: Store) {
		config.max = 5;
		config.readonly = true;
	}

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }
  
}
