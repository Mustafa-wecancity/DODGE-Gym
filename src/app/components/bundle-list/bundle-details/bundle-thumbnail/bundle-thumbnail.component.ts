import { Component, Input } from '@angular/core';
import { IGetBundleList } from '../../../../shared/interface/Models/CustomerPackage/CustomerPackageService';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { CustomPipeForImagesPipe } from '../../../../shared/pipe/custom-pipe-for-images-pipe.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../shared/pipe/currency-symbol.pipe';
import { PaymentOptionComponent } from '../widgets/payment-option/payment-option.component';
import { BundleidebarComponent } from '../sidebar/sidebar.component';
import { BundleContainComponent } from '../widgets/bundle-contain/bundle-contain.component';
import { BundleInformationComponent } from '../widgets/bundle-information/bundle-information.component';
import { SaveOfferComponent } from '../../../themes/widgets/save-offer/save-offer.component';
 
@Component({
  selector: 'app-bundle-thumbnail',
  standalone: true,
  imports: [BundleContainComponent,
    CustomPipeForImagesPipe,TranslateModule,PaymentOptionComponent,SaveOfferComponent],
  templateUrl: './bundle-thumbnail.component.html',
  styleUrl: './bundle-thumbnail.component.scss'
})
export class BundleThumbnailComponent {
  @Input() Bundle: IGetBundleList ;
  @Input() option: Option | null;

}
