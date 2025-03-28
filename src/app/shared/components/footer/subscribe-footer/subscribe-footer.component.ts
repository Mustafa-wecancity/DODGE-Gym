import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { environment } from '../../../../../environments/environment.development';
import { Option } from '../../../interface/theme-option.interface';
import { Subscription } from '../../../action/subscription.action';
import { TranslateModule } from '@ngx-translate/core';
import { BasicFooterComponent } from '../basic-footer/basic-footer.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { Footer } from '../../../interface/theme.interface';
import { GenericService } from '../../../Api-Services/generic.service';
import { API_ENDPOINTS } from '../../../Api-Services/API_ENDPOINTS';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-subscribe-footer',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, BasicFooterComponent, ButtonComponent],
  templateUrl: './subscribe-footer.component.html',
  styleUrl: './subscribe-footer.component.scss'
})
export class SubscribeFooterComponent {

  @Input() data: Option | null;
  @Input() footer: Footer;
isBrowser:boolean;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public storageURL = environment.storageURL;

  public active: { [key: string]: boolean } = {
    categories: false,
    useful_link: false
  };

  constructor( 
    public _homeService: GenericService, @Inject(PLATFORM_ID) private platformId: Object){

    this.isBrowser=  isPlatformBrowser(this.platformId)
    }

  getText(text: string): string{
    const words = text.split(' ');
    const firstTwoWords = words.slice(0, 2)?.join(' ');
    const remainingText = words.slice(2)?.join(' ');
    return `<h2>${firstTwoWords} <span>${remainingText}</span></h2>`
  }

  toggle(value: string){
    this.active[value] = !this.active[value];
  }

  submit(){
    if( isPlatformBrowser(this.platformId))
    if(this.email.valid){
      this._homeService.subscription.add(
        this._homeService
        .create<any ,any>(API_ENDPOINTS.Home.AddToNewsletter, {
          email:this.email.value
        })
        .subscribe(
          (data) => {

            Swal.fire({
              icon: 'success',
              title: 'successfully',
              text: 'Subscribe successfully',
            });
          
           },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
      );
      this.email.reset();
    }
  }
  
}
