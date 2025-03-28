import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../../interface/product.interface';
import { AddToWishlist, DeleteWishlist } from '../../../../action/wishlist.action';
import { Cart } from '../../../../interface/cart.interface';
import { WishlistState } from '../../../../state/wishlist.state';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { ButtonComponent } from '../../button/button.component';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { TitleCasePipe } from '../../../../pipe/title-case.pipe';

@Component({
  selector: 'app-premium-product-box',
  standalone: true,
  imports: [RouterModule, NgbModule, CurrencySymbolPipe, TitleCasePipe,
            ProductHoverActionComponent, ButtonComponent, ProductCartButtonComponent
  ],
  providers: [CurrencySymbolPipe],
  templateUrl: './premium-product-box.component.html',
  styleUrl: './premium-product-box.component.scss'
})
export class PremiumProductBoxComponent {

  @Input() product: Product;
  @Input() class: string;
  @Input() close: boolean;
 
  @Select(WishlistState.wishlistIds) wishlistIds$: Observable<number[]>;

  public cartItem: Cart | null;
  public currentDate: number | null;
  public saleStartDate: number | null;

    
  public wishlistIds: number[];
 
  constructor(private store: Store, config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }

  addToWishlist(product: Product){
    product['is_wishlist'] = !product['is_wishlist'];
    let action = product['is_wishlist']? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }

}
