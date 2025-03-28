 import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IProductList } from '../../../../../shared/interface/Models/CustomerPackage/CustomerPackageService';
import { SummaryPipe } from '../../../../../shared/pipe/summary.pipe';
 
@Component({
  selector: 'app-bundle-information',
  standalone: true,
  imports: [TranslateModule,SummaryPipe],
  templateUrl: './bundle-information.component.html',
  styleUrl: './bundle-information.component.scss'
})
export class BundleInformationComponent {
  @Input() serviceAttachmentsList: IProductList[] =[];

}
