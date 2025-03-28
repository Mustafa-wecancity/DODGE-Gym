import {
  Component,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../button/button.component";
import { GenericService } from "../../../../Api-Services/generic.service";
import { GenericResponse } from "../../../../interface/Models/generic-response";
import { API_ENDPOINTS } from "../../../../Api-Services/API_ENDPOINTS";
@Component({
  selector: 'app-confirmation-error',
  standalone: true,
  imports: [TranslateModule, ButtonComponent],

  templateUrl: './confirmation-error.component.html',
  styleUrl: './confirmation-error.component.scss'
})
 
export class ConfirmationErrorComponent implements OnDestroy {
  public closeResult: string = '';
  public modalOpen: boolean = false; // التحقق من حالة الـ Modal
  public userAction: Record<string, any> = {};
  public id: number;
  public messageCode: number;
  public success: boolean = false;
  public message: string | null = null;
  public errorMessage: string | null = null;

  @ViewChild('confirmationError', { static: false }) ConfirmationError: TemplateRef<string>;

  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() closed: EventEmitter<void> = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  /**
   * فتح الـ Modal مع معالجة تكرار الفتح
   */
  async openModal(action: string, data: any, errorMessage?: { message?: string; title?: string }) {
    if (this.modalOpen) {
      console.warn('Modal is already open.'); // منع التكرار
      return;
    }

    this.modalOpen = true; // تعيين الحالة كمفتوح
    this.userAction = { actionToPerform: action, data: data };
    this.errorMessage = errorMessage?.message || null;
    this.message = errorMessage?.title || null;

    this.modalService
      .open(this.ConfirmationError, {
        ariaLabelledBy: 'Confirmation-Modal',
        centered: true,
        windowClass: 'theme-modal text-center',
      })
      .result.then(
        () => {
          this.modalOpen = false; // إعادة الحالة إلى مغلق
          this.resetState();
        },
        (reason) => {
          this.modalOpen = false; // إعادة الحالة إلى مغلق عند الإغلاق
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.resetState();
        }
      );
  }

  /**
   * إغلاق الـ Modal وإعادة ضبط الحالة
   */
  closeModal() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
      this.modalOpen = false; // إعادة الحالة إلى مغلق
      this.closed.emit(); // إصدار الحدث
    }
  }

  /**
   * إعادة ضبط الحالة بعد الإغلاق
   */
  private resetState() {
    this.errorMessage = null;
    this.message = null;
    this.userAction = {};
  }

  /**
   * سبب الإغلاق
   */
  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * تأكيد الإجراء وإغلاق الـ Modal
   */
  confirm() {
    this.deleteItem.emit(this.userAction);
    this.closeModal();
  }

  /**
   * تنظيف عند تدمير المكون
   */
  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }
}

