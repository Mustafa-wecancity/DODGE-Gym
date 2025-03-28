import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {  ActivatedRoute, RouterLink } from '@angular/router';
import { GenericService } from '../../../../shared/Api-Services/generic.service';
import { SeoV2Service } from '../../../../shared/services/seo-v2.service';
import { LayoutService } from '../../../../shared/Layout/layout.service';
import { ButtonComponent } from '../../../../shared/components/widgets/button/button.component';
import { PublicService } from '../../../../shared/Api-Services/public.service';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-confirm-payment',
  standalone: true,
  imports: [ TranslateModule,CommonModule],
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.scss'
})
export class ConfirmPaymentComponent {
  protected status!: string;
  private _sessionId!: string | null;
  private orderId!: string | null;
  public responseCode!: string | null;
  public SectorType!: string;
  public rsponse: any;
  // Inject ActivatedRoute in the constructor
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private BookTeacherLessonSessionService: GenericService,    private seoService: SeoV2Service,
    private publicService: PublicService ,   @Inject(PLATFORM_ID) private platformId: Object, ) {}
  ngOnInit(): void {
    this.retrieveQueryParam();
    this.isBrowser = isPlatformBrowser(this.platformId);
if( this.isBrowser){

    this.publicService.isLoading.next(true);
    //   this.loder = true;
  let time=1;
  interval(1000)
  .pipe(takeWhile(() => time > 0))
  .subscribe(() => {
    time--;
    if (time <= 0) {
      this.publicService.isLoading.next(false);

    }
  });
}

}
 

  // Inside a method or lifecycle hook where you want to retrieve the parameter
  private retrieveQueryParam() {
    // Using snapshot to get the current state of the route
    // const params = this.route.snapshot.queryParams;
    // Assuming params is an object with a property 'status'
    // this.status = params['status'];

    //mrscoolweb.azurewebsites.net/main/Confirm?
    this.route.queryParamMap.subscribe((params) => {
      this._sessionId = params.get('sessionId');
      this.status = params.get('responseMessage') ?? '';
      this.orderId = params.get('orderId');
      this.responseCode = params.get('responseCode');


      // console.log('Session ID:', this._sessionId);
      // console.log('Response Message:', this.status);
      // console.log('Order ID:', this.orderId);
      // console.log('responseCode :', this.responseCode);


    this.seo();



    });
  }

  private int() {
    // Use bookTeacherLessonSessionId further in your code
    let myObject: any = {
      orderId: this.orderId,
      sessionId: this._sessionId,
    };
    // if (myObject)
    //   this.BookTeacherLessonSessionService.RetrieveOrderInvoice(
    //     myObject
    //   ).subscribe((res) => {
    //     if (res.success === true) {

    //       this.rsponse = res.data;
    //     }
    //   });
  }

  private seo(){
       const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoService.loadTranslations(lang).subscribe(translations => {
      if(this.responseCode=='000')
      this.seoService.setTitle(translations.ConfirmBooking.body.YourPaymentApproveSuccessfully);
      else
      this.seoService.setTitle(translations.ConfirmBooking.body.YourPaymentFailed);

      this.seoService.setHostUrlIndex();
      this.seoService.setMetaDescription(translations.Home.header.meta_description)
      this.seoService.setMetaKeywords(this.seoService.generateKeywords(translations.Home.header.meta_keywords ))


    });

  }
}
