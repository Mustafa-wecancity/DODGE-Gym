import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateSession } from '../../../../../shared/action/theme-option.action';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Subscription } from '../../../../action/subscription.action';
import { Option } from '../../../../interface/theme-option.interface';
import { environment } from '../../../../../../environments/environment.development';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';
import { BrowserOnlyService } from '../../../../Api-Services/browser-only.service';

@Component({
  selector: 'app-newsletter-modal',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './newsletter-modal.component.html',
  styleUrl: './newsletter-modal.component.scss'
})
export class NewsletterModalComponent {

  @ViewChild("newsletterModal", { static: true }) NewsletterModal: TemplateRef<string>;

  @Select(ThemeOptionState.newsletter) newsletter$: Observable<boolean>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public closeResult: string;
  public modalOpen: boolean = true;
  public newsletter: boolean;
  public themeOption: Option;
 
  public isSubmit: boolean = false; 
  public storageURL = environment.storageURL;
  browserOnlyService = inject(BrowserOnlyService);

  constructor(private modalService: NgbModal, private store: Store, private translate: TranslateService){
    this.newsletter$.subscribe(res => this.newsletter = res);
    this.themeOption$.subscribe(res => this.themeOption = res);

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  this.loadImageUrl();
  }
  ngAfterViewInit(): void {
    if(this.browserOnlyService.isBrowser())
    if(this.newsletter === true){
      setTimeout(() => {
      this.openModal();
      }, 3000);
      this.store.dispatch(new UpdateSession('newsletter', false));
    }
  }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.NewsletterModal, {
      ariaLabelledBy: 'profile-Modal',
      centered: true,
      windowClass: 'theme-modal modal-lg newsletter-modal'
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

 


  ngOnDestroy() {
    if(this.modalOpen){
      this.modalService.dismissAll();
    }
  }

  public imageUrl:string
  loadImageUrl(): void {
    this.translate.get('popup.exit.image_url').subscribe((url: string) => {
      this.imageUrl = url || 'assets/images/newsletter/dummy.png';
    });
  }
  
}
