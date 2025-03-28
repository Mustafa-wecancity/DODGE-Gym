import { Component, inject, Input, SimpleChanges } from '@angular/core';
import {  Variation } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { IServiceGetById } from '../../../../../../shared/interface/Models/Service/service-get-by-id';
import { API_ENDPOINTS } from '../../../../../../shared/Api-Services/API_ENDPOINTS';
import { NotificationService } from '../../../../../../shared/services/notification.service';
import { AuthService } from '../../../../../../shared/services/auth.service';
import { GenericService } from '../../../../../../shared/Api-Services/generic.service';
import { GenericResponse } from '../../../../../../shared/interface/Models/generic-response';
import { Router } from '@angular/router';
import { ErrorService } from '../../../../../../shared/services/error.service';

@Component({
  selector: 'app-sticky-checkout',
  standalone: true,
  imports: [ TranslateModule,
            ButtonComponent
  ],
  templateUrl: './sticky-checkout.component.html',
  styleUrl: './sticky-checkout.component.scss'
})
export class StickyCheckoutComponent {

   @Input() ServiceGetById: IServiceGetById;


  public productQty: number = 1;
  public selectedVariation: Variation | null;

  constructor(
    public _Service: GenericService,
    private _AuthService: AuthService,
    private _NotificationService: NotificationService,
    private router:Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['ServiceGetById'] && changes['ServiceGetById'].currentValue) {
      this.ServiceGetById = changes['ServiceGetById']?.currentValue;
    }


  }

  selectVariation(variation: Variation) {
    this.selectedVariation = variation;
  }

  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);
  }

  _ErrorService = inject(ErrorService);

  addToCart(product: IServiceGetById, buyNow: boolean) {
    // if (product && this.productQty > 0) {
    //   if (this._AuthService.getToken()) {
    //     const params = {
    //       serviceId: product.id,
    //       qty: this.productQty,
    //       price: product.points,
    //       buyByPoints: buyNow,
    //     };

    //     this._Service.subscription.add(
    //       this._Service
    //         .create<GenericResponse<any>, any>(
    //           API_ENDPOINTS.Bundle.PurchaseBundle,
    //           params
    //         )
    //         .subscribe(
    //           // must be change endpointe post to get
    //           (data) => {
    //             if (data.success) {
    //               this. _ErrorService.setNotification({message :'تم إضافة المنتج إلى سلة التسوق'});


    //             }
    //           },
    //           (error) => {
    //             console.error("Error fetching data", error);
    //           }
    //         )
    //     );
    //   } else {
    //     this.router.navigate([`/auth/login`]);      
      
    //   }
    // }
  }

  addToWishlist(service: IServiceGetById) {

    if (this._AuthService.getToken()) {
      const params = { serviceId: service.id };

      this._Service.subscription.add(
        this._Service
          .get<GenericResponse<any>>(
            API_ENDPOINTS.CustomerWishlists.AddToWishList,
            params
          )
          .subscribe(
            // must be change endpointe post to get
            (data) => {
               
              // this._NotificationService.showSuccess("add_success");
            },
            (error) => {
              console.error("Error fetching data", error);
            }
          )
      );
    } else {
      this.router.navigate([`/auth/login`]);    }
  }


}
