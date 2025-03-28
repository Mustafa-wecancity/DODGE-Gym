import { Component, Input, ViewChild, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountUser } from '../../../../interface/account.interface';
import { AccountState } from '../../../../state/account.state';
import { AuthState } from '../../../../state/auth.state';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ConfirmationModalComponent } from '../../../widgets/modal/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericService } from '../../../../Api-Services/generic.service';
import { IGetProfileLocalized } from '../../../../interface/Models/Customer/profileModel';
import { AuthService } from '../../../../services/auth.service';
import { CustomPipeForImagesPipe } from '../../../../pipe/custom-pipe-for-images-pipe.pipe';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, ConfirmationModalComponent,CustomPipeForImagesPipe],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {

  @Input() style: string = 'basic';
  localStorage = inject(AuthService) 

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<string>;
  @Select(AccountState.user) user$: Observable<AccountUser>;

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;
  public Customer: IGetProfileLocalized  

  constructor(private store: Store, private modal: NgbModal,
    public _dashboardService: GenericService,
  ) {
 
    // if(this.localStorage.getToken())
    // this._dashboardService.subscription.add(this._dashboardService.get<IGetProfileLocalized>(API_ENDPOINTS.Customer.GetProfileLocalized).subscribe(
    //   data => {
    //     this.Customer = data;
    //   },
    //   error => {
    //     console.error('Error fetching data', error);
    //   }
    // ));
  }

  logout() {
    this.localStorage.logOut();
    this.modal.dismissAll();
    // window.location.reload();

  }

}
