import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Product } from '../../../../../shared/interface/product.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SendReview, UpdateReview } from '../../../../../shared/action/review.action';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-review-modal',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgbModule,
            ButtonComponent
  ],
  templateUrl: './review-modal.component.html',
  styleUrl: './review-modal.component.scss'
})
export class ReviewModalComponent {

  @ViewChild("reviewModal", { static: false }) ReviewModal: TemplateRef<string>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public product: Product;
  public currentRate: number = 0;
  public review = new FormControl('', [Validators.required])
  public form: FormGroup;
  public type: string;

  constructor( private modalService: NgbModal, private store: Store ){
    this.form = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      description: new FormControl('')
    })
  }

  async openModal(product: Product, type: string) {
    this.modalOpen = true;
    this.type = type;
    this.product = product;
    type === 'edit' && this.form.patchValue({rating: product.user_review.rating, description: product.user_review.description})

    this.modalService.open(this.ReviewModal, {
      ariaLabelledBy: 'profile-Modal',
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

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      let data = {
        product_id: this.product.id,
        rating: this.form.get('rating')?.value,
        review_image_id: '',
        description: this.form.get('description')?.value
      }
      let action = new SendReview(data);

      if(this.type === 'edit' && this.product.user_review.id){
        action = new UpdateReview(this.product.user_review.id, data)
      }
      this.store.dispatch(action);
    }
  }

}
