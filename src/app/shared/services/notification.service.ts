import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Params } from '../interface/core.interface';
import { NotificationModel } from '../interface/notification.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public alertSubject = new Subject();

  public notification: boolean = true;

  constructor(private zone: NgZone,
    private http: HttpClient,
    private _transition: TranslateService, 
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  showSuccess(message: string): void {
  const messageLocalized =  this._transition.instant(message)
    this.alertSubject.next({type: 'success', message: messageLocalized});
    this.zone.run(() => {
      this.modalService.dismissAll();
      if(this.notification) { 
        this.toastr.success(messageLocalized);
      }
    });
  }

  showError(message: string): void {
    this.alertSubject.next({type: 'error', message: message});
      this.zone.run(() => {    
        if(this.notification) {
          this.toastr.error(message);
        }
      });
  }

  getNotifications(payload?: Params): Observable<NotificationModel> {
    return this.http.get<NotificationModel>(`${environment.URL}/notifications.json`, { params: payload });
  }

}
