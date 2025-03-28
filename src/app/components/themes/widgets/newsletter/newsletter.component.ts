import { Component, Input } from '@angular/core';
import { NewsLetter } from '../../../../shared/interface/theme.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from '../../../../shared/action/subscription.action';
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../shared/components/widgets/button/button.component';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {

  @Input() data: NewsLetter | null;
  @Input() style: string = 'basic';
  
  public email = new FormControl('', [Validators.email]);
  public isSubmit: boolean = false; 
  public storageURL = environment.storageURL;

  constructor(private store: Store) {}

  submit(){
    this.isSubmit = true;
    if(this.email.valid){
      this.store.dispatch(new Subscription({email: this.email.value!}))
      this.email.reset();
      this.isSubmit = false;
    }
  }

}
