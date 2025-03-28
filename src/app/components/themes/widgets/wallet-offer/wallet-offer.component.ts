import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel';
import { Offer } from '../../../../shared/interface/theme.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ButtonComponent } from '../../../../shared/components/widgets/button/button.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-wallet-offer',
  standalone: true,
  imports: [TranslateModule, CarouselModule, FormsModule,
            ButtonComponent],
  templateUrl: './wallet-offer.component.html',
  styleUrl: './wallet-offer.component.scss'
})
export class WalletOfferComponent {

  @Input() offers: Offer[];

  public customOptionsItem3 = data.customOptionsItem3;
  public storageURL = environment.storageURL;

  copyFunction(txt:string){
    navigator.clipboard.writeText(txt);
  }

}
