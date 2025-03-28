import { Component, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { TopbarComponent } from '../widgets/topbar/topbar.component';
import { NavbarMenuButtonComponent } from '../widgets/navbar-menu-button/navbar-menu-button.component';
import { LogoComponent } from '../widgets/logo/logo.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { MyAccountComponent } from '../widgets/my-account/my-account.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-minimal-header',
  standalone: true,
  imports: [TranslateModule, TopbarComponent, NavbarMenuButtonComponent,
            LogoComponent, ButtonComponent, MenuComponent,
            MyAccountComponent
  ],
  templateUrl: './minimal-header.component.html',
  styleUrl: './minimal-header.component.scss'
})
export class MinimalHeaderComponent {

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() sticky: boolean | number | undefined; // Default false
  @Input() class: string | undefined;

  public stick: boolean = false;
  public active: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if(isPlatformBrowser(this.platformId)){
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
