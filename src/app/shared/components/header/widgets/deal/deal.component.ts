import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { DealsModalComponent } from '../../../widgets/modal/deals-modal/deals-modal.component';
import { GetDealProducts } from '../../../../../shared/action/product.action';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deal',
  standalone: true,
  imports: [TranslateModule, ButtonComponent, DealsModalComponent,RouterLink],
  templateUrl: './deal.component.html',
  styleUrl: './deal.component.scss'
})
export class DealComponent {

  @Input() style: string = 'basic';
  @Input() data: Option | null;
 
  @ViewChild("dealsModal") DealsModal: DealsModalComponent;


  public dealProducts: Product[];
  public ids: number[]; 

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    this.ids = changes['data']?.currentValue?.header?.today_deals;
  }

  ngOnInit(){
   
  }

}
