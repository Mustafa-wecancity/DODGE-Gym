import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ContactUs } from '../../../shared/action/page.action';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Contact, Option } from '../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { IServiceType } from '../../../shared/interface/Models/iads';
import { GenericService } from '../../../shared/Api-Services/generic.service';
import { API_ENDPOINTS } from '../../../shared/Api-Services/API_ENDPOINTS';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GetContact } from '../../../shared/interface/Models/Region/SiteSettig';
import { OnlyNumbersDirective } from '../../../shared/directive/only-numbers.directive';

@Component({
    selector: 'app-contact-us',
    standalone:true,
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
    imports: [CommonModule,BreadcrumbComponent, ReactiveFormsModule, ButtonComponent, TranslateModule, NgSelectModule, OnlyNumbersDirective]
})
export class ContactUsComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Contact Us",
    items: [{ label: 'Contact Us', active: true }]
  }

  public form: FormGroup;
  public contactData: Contact;

  constructor(private formBuilder: FormBuilder,
    public ApiServices: GenericService,
    private translate: TranslateService,

    private store: Store){
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      serviceTypeId: new FormControl('', [Validators.required]),
    })

    // this.themeOption$.subscribe(data=> this.contactData = data?.contact_us)
    this.getServiceType()
    this.GetContact()
  }
  get fc ()
{
  return this.form.controls;
}

 

  validate!: boolean;

  public submit() {
    this.form.markAllAsTouched();
  
      if (this.form.valid) {
        this.validate = false;
          this.Insert();
  
      } else {
        this.validate = true;
    this.form.markAllAsTouched();
      }
    }
  public ServiceTypes: IServiceType[] = [];
  getServiceType(){
    this.ApiServices.subscription.add(
      this.ApiServices.getAll<IServiceType>(
        API_ENDPOINTS.ServiceType.GetAllForList
      ).subscribe((res) => {
         this.ServiceTypes = res;
      })
    );
  }

  Insert() {

    // this.form.get('inactive')?.setValue(!this.form.get('inactive')?.value)
    // this.Inactive=!this.form.get('inactive')?.value
    this.ApiServices.create<any, any>(
      API_ENDPOINTS.ContactUS.Create,
      this.form.getRawValue()
    ).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: this.translate.instant("Successfully Saved"),
        showConfirmButton: false,
        timer: 1500,
      });

      this.form.reset();

    });
  }

  
  SiteSettings!: GetContact


  GetContact() {
    this.ApiServices.get<GetContact>(
      API_ENDPOINTS.SiteSetting.GetContact
    ).subscribe((res) => {
      if (res != null) {
        this.SiteSettings = res
      }
    })
  }
}
