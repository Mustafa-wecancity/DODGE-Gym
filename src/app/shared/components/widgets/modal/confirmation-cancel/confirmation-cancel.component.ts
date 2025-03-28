import {
  Component,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../button/button.component";
import { GenericService } from "../../../../Api-Services/generic.service";
import { GenericResponse } from "../../../../interface/Models/generic-response";
import { API_ENDPOINTS } from "../../../../Api-Services/API_ENDPOINTS";
@Component({
  selector: 'app-confirmation-cancel',
  standalone: true,
  imports: [TranslateModule, ButtonComponent],
  templateUrl: './confirmation-cancel.component.html',
  styleUrl: './confirmation-cancel.component.scss'
})
export class ConfirmationCancelComponent {
  public closeResult: string;
  public modalOpen: boolean = false;
  public userAction = {};

  @ViewChild("confirmationModal", { static: false }) ConfirmationModal: TemplateRef<string>;

  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
public id :number ;
  constructor(
    private modalService: NgbModal,
    public OrderService: GenericService
  ) {}
  
  // async openModal() {
  //   this.modalOpen = true;
  //   this.modalService.open(this.ConfirmationModal, {
  //     ariaLabelledBy: 'Confirmation-Modal',
  //     centered: true,
  //     windowClass: 'theme-modal text-center'
  //   }).result.then((result) => {
  //     `Result ${result}`
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  async openModal(action: string, data: any) {
    this.modalOpen = true;
    this.userAction = {
      actionToPerform: action,
      data: data,
    };
    this.modalService
      .open(this.ConfirmationModal, {
        ariaLabelledBy: 'Confirmation-Modal',

        centered: true,
        windowClass: "theme-modal text-center",
      })
      .result.then(
        (result) => {
          `Result ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  confirm() {
    this.deleteItem.emit(this.userAction);
      this.modalService.dismissAll();


  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

  @Output() closed = new EventEmitter<void>(); // Emits when the modal closes

  closeModal() {
    // Logic to close the modal
    console.log("Modal closed");
    this.closed.emit(); // Emit the close event
  }
}
