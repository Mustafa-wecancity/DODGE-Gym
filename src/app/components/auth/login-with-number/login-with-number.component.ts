import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Router, RouterModule } from '@angular/router';
import { SettingState } from '../../../shared/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../shared/interface/setting.interface';
import * as data from '../../../shared/data/country-code';
import { LoginWithNumber } from '../../../shared/action/auth.action';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Module } from 'ng-select2-component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';

@Component({
  selector: 'app-login-with-number',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule,
            Select2Module, RouterModule, BreadcrumbComponent,
            ButtonComponent, AlertComponent
  ],
  templateUrl: './login-with-number.component.html',
  styleUrl: './login-with-number.component.scss'
})
export class LoginWithNumberComponent {

  @Select(SettingState.setting) setting$: Observable<Values>;
  
  public form: FormGroup;
  public codes = data.countryCodes;

  public breadcrumb: Breadcrumb = {
    title: "Login With Number",
    items: [{ label: 'Login With Number', active: true }]
  }

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      country_code: new FormControl('91', [Validators.required]),
    })
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new LoginWithNumber(this.form.value)).subscribe({
        complete: () => {
          this.authService.otpType = 'number';
           this.router.navigateByUrl('/auth/otp'); 
        }
      })
    }
  }

}
