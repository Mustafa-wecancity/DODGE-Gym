import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
  inject,
} from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { User } from "../../../shared/interface/user.interface";
import { AccountState } from "../../../shared/state/account.state";
 
import { ConfirmationModalComponent } from "../../../shared/components/widgets/modal/confirmation-modal/confirmation-modal.component";
 import { CommonModule, isPlatformBrowser } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { AuthService } from "../../../shared/services/auth.service";
import { CustomPipeForImagesPipe } from "../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { UserService } from "../../../shared/Api-Services/user.service";
import { IGetProfileLocalized } from "../../../shared/interface/Models/Customer/profileModel";
import { AttributeService } from "../../../shared/services/attribute.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ButtonComponent,
    ConfirmationModalComponent,
    CustomPipeForImagesPipe,
  ],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent implements OnInit {
  @Input() show: boolean;
  isBrowser: boolean;
  @Output() menu: EventEmitter<boolean> = new EventEmitter();
  localStorage = inject(AuthService);

 

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  public unreadNotificationCount: number;
  public customerData: IGetProfileLocalized;

  constructor(
    private userService: UserService,
    public attributeService: AttributeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser){
       this.userService.currentUser$.subscribe((user) => {
        if (user) {
          this.customerData = user;
          // قم بتحديث أي بيانات أخرى في sidebar
        }
      });
    }
     
  }
  ngOnInit(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof localStorage !== "undefined"
    ) {
      const customerLogin = this.localStorage.GetByName("customer_login");
      if (customerLogin) {
        try {
          this.customerData = JSON.parse(customerLogin);
        } catch (e) {
          console.error("Error parsing customer login data", e);
        }
      }
    }
  }
  logout() {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof localStorage !== "undefined"
    )
      this.localStorage.logOut();
    // this.store.dispatch(new Logout())
    // window.location.reload();
  }

  openMenu(value: boolean) {
    this.menu.emit(value);
    this.attributeService.offCanvasMenu = value;
  }

  
 
}
