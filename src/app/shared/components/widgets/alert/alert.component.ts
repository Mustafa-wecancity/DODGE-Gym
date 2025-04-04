import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

export interface Alert {
  type: string | null;
  message: string | null;
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  public alert: Alert = {
    type: null,
    message: null
  };

  constructor(private notificationService: NotificationService) { 
    this.notificationService.alertSubject.subscribe(alert => {
      this.alert = <Alert>alert;
    })
  }

  ngOnDestroy() {
    this.notificationService.notification = true;
  }

}
