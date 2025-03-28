import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../../../shared/interface/product.interface';
 import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiForImageForReport } from '../../../interface/Models/appSetting';
import { IAds } from '../../../interface/Models/iads';

@Component({
  selector: 'app-image-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './image-link.component.html',
  styleUrl: './image-link.component.scss'
})
export class ImageLinkComponent {

 
  @Input() image: any;
  @Input() image_: any;
  @Input() ads: IAds;
  @Input() link: string;
  @Input() bgImage: boolean;
  @Input() class: string;

  public storageURL = environment.storageURL;
    public storageURL_ = ApiForImageForReport;
  public imageDefault = environment.imageDefault;
  
  constructor(){}

  getProductSlug(id: number, products: Product[]){
    let product = products.find(product => product.id === id);
    return product ? product.slug : null;
  }

}
