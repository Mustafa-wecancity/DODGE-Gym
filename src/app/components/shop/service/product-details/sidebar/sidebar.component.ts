import { Component, Input } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../../../shared/Layout/layout.service';

@Component({
  selector: 'app-product-details-sidebar',
  standalone: true,
  imports: [CommonModule, 
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class ProductSidebarComponent {
  
  public storageURL = environment.storageURL;
  constructor(
    public layoutService: LayoutService,

  )
{
 
}
}
