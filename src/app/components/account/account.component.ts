import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/widgets/button/button.component';
import { AttributeService } from '../../shared/services/attribute.service';
import { BrowserOnlyService } from '../../shared/Api-Services/browser-only.service';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule,
             SidebarComponent,
            ButtonComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  // @Select(LoaderState.status) loadingStatus$: Observable<boolean>;

  public open: boolean = false;
  public browserOnlyService = inject(BrowserOnlyService);
 
  constructor( private router: Router,
    public attributeService: AttributeService) 
  {
    // this.openMenu(true)
   
   
 
  }

  openMenu(value: boolean) {
    this.open = value;
  }

}
