import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../../../../shared/pipe/title-case.pipe';
import { IServiceAttachmentsList } from '../../../../../../shared/interface/Models/Service/service-get-by-id';

@Component({
  selector: 'app-product-information',
  standalone: true,
  imports: [TranslateModule, TitleCasePipe],
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.scss'
})
export class ProductInformationComponent {

  @Input() serviceAttachmentsList?: IServiceAttachmentsList[] =[];

}
