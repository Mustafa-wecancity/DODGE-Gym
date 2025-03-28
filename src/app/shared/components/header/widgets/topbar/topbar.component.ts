import { Component, Inject, inject, Input, PLATFORM_ID } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NoticeComponent } from '../notice/notice.component';
import { LanguageComponent } from '../language/language.component';
import { CurrencyComponent } from '../currency/currency.component';
import { AuthService } from '../../../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ITopBarContent } from '../../../../interface/Models/ServiceRequest/CreateServiceRequestModel';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [TranslateModule,  
            RouterLink,RouterLinkActive,NoticeComponent
            
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  public isBrowser: boolean;

  @Input() data: Option | null;
  localStorage = inject(AuthService);
constructor(    @Inject(PLATFORM_ID) private platformId: Object){

  this.isBrowser = isPlatformBrowser(this.platformId);

}

  isLogin:boolean=false
 
  TickersList_:ITopBarContent[] = [];
  ngOnInit(): void {
    // if ( typeof localStorage !== 'undefined') {
    //   this. isLogin = this.localStorage.GetByName("customerAuthorization")? true :false;
    //   const customerLogin = this.localStorage.GetByName("customer_login");
    //   if (customerLogin) {
    //     try {
    //       this.companyNumber = this.localStorage.GetByName("companyNumber");
    //       this.companyName = this.localStorage.GetByName("companyName");
    //       this.isCompany = JSON.parse(this.localStorage.GetByName("isCompany"));
    //   // this.isLogin=true;

    //     } catch (e) {
    //       console.error("Error parsing customer login data", e);
    //     }
    //   }
    //   else
    //   this.isLogin=false
    // }
  }

}
