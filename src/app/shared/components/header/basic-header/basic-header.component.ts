import { Component, Input, HostListener, inject } from '@angular/core';
import { Option } from '../../../interface/theme-option.interface';
import { TopbarComponent } from '../widgets/topbar/topbar.component';
import { NavbarMenuButtonComponent } from '../widgets/navbar-menu-button/navbar-menu-button.component';
import { LogoComponent } from '../widgets/logo/logo.component';
import { CallComponent } from '../widgets/call/call.component';
import { MyAccountComponent } from '../widgets/my-account/my-account.component';
 import { ButtonComponent } from '../../widgets/button/button.component';
import { DealComponent } from '../widgets/deal/deal.component';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { RouterLink } from '@angular/router';
import { NoticeComponent } from '../widgets/notice/notice.component';
import { LanguageComponent } from '../widgets/language/language.component';
import { BrowserOnlyService } from '../../../Api-Services/browser-only.service';
import { PublicService } from '../../../Api-Services/public.service';

@Component({
  selector: 'app-basic-header',
  standalone: true,
  imports: [TranslateModule,TopbarComponent, NavbarMenuButtonComponent, LogoComponent,
            CallComponent, 
        MyAccountComponent,
            ButtonComponent, DealComponent, MenuComponent,RouterLink,NoticeComponent,LanguageComponent
  ],
  templateUrl: './basic-header.component.html',
  styleUrl: './basic-header.component.scss'
})
export class BasicHeaderComponent {
 
  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() sticky: boolean | number | undefined; // Default false
  @Input() class: string | undefined;

  public stick: boolean = false;
  public active: boolean = false;

  constructor(public _PublicService: PublicService) {}
  // @HostListener Decorator
  browserOnlyService = inject(BrowserOnlyService);
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.browserOnlyService.isBrowser()) {

    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) {
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }
}

  toggle(val: boolean){
    this.active = val;
  }

}
