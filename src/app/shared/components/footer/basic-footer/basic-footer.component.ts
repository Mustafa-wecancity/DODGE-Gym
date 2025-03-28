import { Component, Input } from '@angular/core';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { FooterLogoComponent } from '../widgets/logo/logo.component';
import { FooterAboutComponent } from '../widgets/about/about.component';
import { FooterLinksComponent } from '../widgets/links/links.component';
import { FooterContactComponent } from '../widgets/contact/contact.component';
import { FooterCopyrightComponent } from '../widgets/copyright/copyright.component';
import { FooterPaymentOptionsComponent } from '../widgets/payment-options/payment-options.component';
import { FooterSocialLinksComponent } from '../widgets/social-links/social-links.component';
import { NoDataComponent } from '../../widgets/no-data/no-data.component';
import { Footer } from '../../../interface/theme.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GenericService } from '../../../Api-Services/generic.service';
import { IGetCategory } from '../../../interface/Models/Category/CategoryModel';
import { API_ENDPOINTS } from '../../../Api-Services/API_ENDPOINTS';
import { LayoutService } from '../../../Layout/layout.service';
import { PublicService } from '../../../Api-Services/public.service';

@Component({
  selector: 'app-basic-footer',
  standalone: true,
  imports: [TranslateModule, FooterLogoComponent, FooterAboutComponent,
           FooterLinksComponent, FooterContactComponent,
            FooterCopyrightComponent, FooterPaymentOptionsComponent, FooterSocialLinksComponent,
            NoDataComponent,RouterLink,RouterLinkActive
  ],
  templateUrl: './basic-footer.component.html',
  styleUrl: './basic-footer.component.scss'
})
export class BasicFooterComponent {

  @Input() data: Option | null;
  @Input() footer: Footer;
/**
 *
 */
constructor( public _homeService: GenericService,
  public layoutService: LayoutService, 
public _PublicService :PublicService) {
  // this.GetAllHomeCategory();
 
  
}
  public active: { [key: string]: boolean } = {
    categories: false,
    Corporate_Account: false,
    useful_link: true
  };

  toggle(value: string){
    this.active[value] = !this.active[value];
  }
  

 
  categories: IGetCategory[] = [];

  GetAllHomeCategory(){
    
  this._homeService.subscription.add(
    this._homeService
      .getAll<IGetCategory>(API_ENDPOINTS.Home.GetAllHomeCategory)
      .subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.error("Error fetching data", error);
        }
      )
  );
}
}
