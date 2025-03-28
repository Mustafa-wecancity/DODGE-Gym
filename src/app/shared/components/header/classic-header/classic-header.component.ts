import { Component, Input, HostListener, inject } from '@angular/core';
import { Option } from '../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarMenuButtonComponent } from '../widgets/navbar-menu-button/navbar-menu-button.component';
import { LogoComponent } from '../widgets/logo/logo.component';
import { CallComponent } from '../widgets/call/call.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { SearchBoxComponent } from '../widgets/search-box/search-box.component';
import { CompareComponent } from '../widgets/compare/compare.component';
import { MyAccountComponent } from '../widgets/my-account/my-account.component';
import { BrowserOnlyService } from '../../../Api-Services/browser-only.service';

@Component({
  selector: 'app-classic-header',
  standalone: true,
  imports: [TranslateModule, NavbarMenuButtonComponent, LogoComponent,
             CallComponent, ButtonComponent, 
            MenuComponent, SearchBoxComponent, CompareComponent,
        MyAccountComponent
  ],
  templateUrl: './classic-header.component.html',
  styleUrl: './classic-header.component.scss'
})
export class ClassicHeaderComponent {

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() sticky: boolean | number | undefined; // Default false
  @Input() class: string | undefined;

  public stick: boolean = false;
  public active: boolean = false;

  browserOnlyService = inject(BrowserOnlyService);

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) {
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

  toggle(val: boolean){
    this.active = val;
  }

}
