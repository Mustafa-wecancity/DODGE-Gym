import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { UpdateUserPassword } from '../../../../action/account.action';
import { CustomValidators } from '../../../../validator/password-match';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';
import { GenericService } from '../../../../Api-Services/generic.service';
import { GenericResponse } from '../../../../interface/Models/generic-response';
import { PostCahngePassword, ResponseChangePassword } from '../../../../interface/Models/Customer/passwordModel';
import { API_ENDPOINTS } from '../../../../Api-Services/API_ENDPOINTS';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, ButtonComponent, 
    NgbTooltipModule,
  ],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss'
})
export class ChangePasswordModalComponent {

  public form: FormGroup;
  public closeResult: string;

  public modalOpen: boolean = false;

  @ViewChild("passwordModal", { static: false }) PasswordModal: TemplateRef<string>;
  
  constructor(private modalService: NgbModal,
 public notifier :NotificationService,
 public _ChangeService :GenericService,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
       currentPassword: new FormControl('', [Validators.required]),
       newPassword: new FormControl('', [Validators.required]),
        password_confirmation: new FormControl('', [Validators.required])
      },{validator : CustomValidators.MatchValidator('newPassword', 'password_confirmation')})
  }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.PasswordModal, {
      ariaLabelledBy: 'password-Modal',
      centered: true,
      windowClass: 'theme-modal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get passwordMatchError() {
    return (
      this.form?.getError('mismatch') &&
      this.form?.get('password_confirmation')?.touched
    );
  }
  get fc(){
    return this.form.controls;
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this._ChangeService.subscription.add( this._ChangeService.create<GenericResponse<ResponseChangePassword>,PostCahngePassword>(API_ENDPOINTS.Customer.ChangePassword,this.form.getRawValue()).subscribe(res=>{
        const response= res.data
        if (res.success) {
          // this.notifier.showSuccess('passwordChanged')
          this.form.reset()
          
        }
          this._ChangeService.submit = true;
      },
      (err) => {
        // this.form.reset()
        this._ChangeService.submit  = true;
      }
    ));
    }
  }

  ngOnDestroy() {
    if(this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
