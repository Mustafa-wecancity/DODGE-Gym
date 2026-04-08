 
import {
  Component,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../button/button.component";
import { GenericService } from "../../../../Api-Services/generic.service";
import { GenericResponse } from "../../../../interface/Models/generic-response";
import { API_ENDPOINTS } from "../../../../Api-Services/API_ENDPOINTS";
import { IServiceGetById } from "../../../../interface/Models/Service/service-get-by-id";
import { GetServiceRequest } from "../../../../interface/Models/ServiceRequest/CreateServiceRequestModel";
@Component({
  selector: 'app-updateservice',
  standalone: true,
  imports: [TranslateModule, ButtonComponent],
  templateUrl: './updateservice.component.html',
  styleUrl: './updateservice.component.scss'
})
export class UpdateserviceComponent {
  public closeResult: string;
  public modalOpen: boolean = false;
  public userAction = {};
  ServiceGetById: GetServiceRequest;

  @ViewChild("confirmationModal", { static: false }) ConfirmationModal: TemplateRef<string>;

  @Output() updateItem: EventEmitter<any> = new EventEmitter();
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

  async openModal(action: string, data: GetServiceRequest) {
    this.modalOpen = true;
    this.ServiceGetById = data;
      this.productQty= this.ServiceGetById.qty;
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
    this.ServiceGetById.qty=this.productQty;
  
    this.updateItem.emit(this.ServiceGetById);
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
  public productQty: number = 1;

    updateQuantity(qty: number) {
    if (1 > this.productQty + qty ) return;
    this.productQty = this.productQty + qty;
    // this.CalculateServiceTotalWithTax();
  }
}
