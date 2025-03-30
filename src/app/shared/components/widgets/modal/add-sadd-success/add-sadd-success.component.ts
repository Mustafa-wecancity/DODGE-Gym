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
import { interval, Subscription, takeWhile } from "rxjs";
import { ErrorService } from "../../../../services/error.service";
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-add-sadd-success',
  standalone: true,
  imports: [TranslateModule, ButtonComponent, RouterLink],

  templateUrl: './add-sadd-success.component.html',
  styleUrl: './add-sadd-success.component.scss'
})
export class AddSaddSuccessComponent implements OnDestroy {
  public closeResult: string;
  public modalOpen: boolean = false;
  public userAction = {};
  public id: number;
  public messageCode: number;
  public success: boolean;
  public message: string;
  public notificationMessage: string = '';
  private timerSubscription: Subscription;

  @ViewChild('addsuccessModal', { static: false }) AddsuccessModal: TemplateRef<string>;
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() closed: EventEmitter<void> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    public OrderService: GenericService,
    public ErrorService: ErrorService
  ) {}

  async openModal(action: string, data: any, notificationMessage?: any) {
    if (this.modalOpen) {
      return; // منع التكرار
    }

    this.modalOpen = true;
    this.userAction = { actionToPerform: action, data: data };
    this.notificationMessage = notificationMessage?.message || null;

    // فتح الـ Modal باستخدام الخدمة
    this.modalService
      .open(this.AddsuccessModal, {
        ariaLabelledBy: 'Confirmation-Modal',
        centered: true,
        windowClass: 'theme-modal text-center',
      })
      .result.then(
        (result) => {
          this.modalOpen = false;
        },
        (reason) => {
          this.modalOpen = false;
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

    // عد تنازلي لإغلاق الـ Modal تلقائيًا بعد 4 ثوانٍ
    this.startAutoCloseTimer();
  }

  private startAutoCloseTimer() {
    let time = 6;
    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => time > 0))
      .subscribe(() => {
        time--;
        if (time <= 0) {
          this.close(); // إغلاق الـ Modal
          this.timerSubscription.unsubscribe(); // تنظيف الاشتراك
        }
      });
  }

  close() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
      this.modalOpen = false;
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe(); // تنظيف المؤقت عند تدمير المكون
      }
      this.closed.emit(); // Emit an event عند الإغلاق
    }
  }

  confirm() {
    this.deleteItem.emit(this.userAction);
    this.close();
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

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // تنظيف المؤقت عند تدمير المكون
    }
  }
}
