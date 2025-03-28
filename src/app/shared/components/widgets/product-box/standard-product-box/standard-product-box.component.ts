import { Component, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Product } from '../../../../interface/product.interface';
import { DeleteWishlist } from '../../../../action/wishlist.action';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { ButtonComponent } from '../../button/button.component';
  import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-standard-product-box',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, CurrencySymbolPipe, 
            ButtonComponent,  
  ],
  providers: [CurrencySymbolPipe],
  templateUrl: './standard-product-box.component.html',
  styleUrl: './standard-product-box.component.scss'
})
export class StandardProductBoxComponent {

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
