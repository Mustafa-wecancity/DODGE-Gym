import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AttributeService } from '../../../../services/attribute.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterModule ,TranslateModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {

  public active: string = '/';

  constructor(private store: Store,public attributeService: AttributeService){}



  activeMenu(menu: string){
    this.active = menu
  }
  
  opneCanvasMenu() {
    this.attributeService.offCanvasMenu = true;
  }

}
