import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/interface/product.interface';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ThemeOptionState } from '../../../state/theme-option.state';
import { Option } from '../../../interface/theme-option.interface';
import { ThemeOptionService } from '../../../services/theme-option.service';
import { ClassicProductBoxComponent } from './classic-product-box/classic-product-box.component';
import { StandardProductBoxComponent } from './standard-product-box/standard-product-box.component';
import { ProductBoxVerticalComponent } from './product-box-vertical/product-box-vertical.component';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [  ClassicProductBoxComponent,
            StandardProductBoxComponent, ProductBoxVerticalComponent
  ],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss'
})
export class ProductBoxComponent {

  @Input() product: Product;
  @Input() style: string  = 'horizontal';
  @Input() class: string;
  @Input() close: boolean = false;

  public variant: string;
  public theme: string;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  constructor(public themeOptionService: ThemeOptionService){}

}
