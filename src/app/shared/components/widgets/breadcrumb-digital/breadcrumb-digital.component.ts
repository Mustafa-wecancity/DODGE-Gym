import { Component, Input } from '@angular/core';
import { Product } from '../../../interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-breadcrumb-digital',
  standalone: true,
  imports: [TranslateModule, RouterModule, NgbModule],
  templateUrl: './breadcrumb-digital.component.html',
  styleUrl: './breadcrumb-digital.component.scss'
})
export class BreadcrumbDigitalComponent {

  @Input() product: Product;
  
}
