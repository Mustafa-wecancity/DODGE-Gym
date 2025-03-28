import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../../../shared/interface/order.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingState } from '../../../../../shared/state/setting.state';
import { Values } from '../../../../../shared/interface/setting.interface';
import { RePayment } from '../../../../../shared/action/order.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-pay-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, 
            ButtonComponent],
  templateUrl: './pay-modal.component.html',
  styleUrl: './pay-modal.component.scss'
})
export class PayModalComponent {

  @ViewChild("payModal", { static: false }) PayModal: TemplateRef<string>;
  @Select(SettingState.setting) setting$: Observable<Values>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public order: Order;
  public paymentType = new FormControl('', [Validators.required]);

  constructor( private modalService: NgbModal, private store: Store){}

  async openModal(order: Order) {
    this.order = order;
    this.modalOpen = true;
    this.modalService.open(this.PayModal, {
      ariaLabelledBy: 'profile-Modal',
      centered: true,
      windowClass: 'theme-modal pay-modal'
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

  submit() {
    this.paymentType.markAllAsTouched();
    if(this.paymentType.valid){
      const data = {
        order_number: this.order.order_number,
        payment_method: this.paymentType.value!
      }
      this.store.dispatch(new RePayment(data)).subscribe({
        complete: () => {
          this.modalService.dismissAll();
        }
      });
    }
  }

}
