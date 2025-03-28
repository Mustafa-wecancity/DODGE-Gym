import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { LayoutService } from "../../../shared/Layout/layout.service";
import { isPlatformBrowser } from "@angular/common";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { CustomerOrderServiceManagement } from "../../../shared/interface/Models/Attachment/attachment";
import { TranslateModule } from "@ngx-translate/core";
import { ChatComponent } from "./chat/chat.component";
import { CustomPipeForImagesPipe } from "../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { AttachmentForOrderServiceComponent } from "./attachment-for-order-service/attachment-for-order-service.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PublicService } from "../../../shared/Api-Services/public.service";

@Component({
  selector: "app-service-management",
  standalone: true,
  imports: [
    TranslateModule,
    ChatComponent,
    CustomPipeForImagesPipe,
    AttachmentForOrderServiceComponent,
    NgbModule,
  ],
  templateUrl: "./service-management.component.html",
  styleUrl: "./service-management.component.scss",
})
export class ServiceManagementComponent {
  @ViewChild("audioPlayer") audioPlayer: ElementRef<HTMLAudioElement>;
  isBrowser: boolean;

  id: string | null;
  constructor(
    // private router: Router,
    private route: ActivatedRoute,
    private orderserveicesDetails: GenericService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id") ?? null;
      if (this.id) {
        this.GetServicDetailsDetail(this.id);
      } else {
        console.warn("ID not found in route parameters");
      }
    });

    this.seo();
  }

  CustomerOrderServiceDetails: CustomerOrderServiceManagement;
  GetServicDetailsDetail(id: string) {
    const params = { id: id };

    this.orderserveicesDetails.subscription.add(
      this.orderserveicesDetails
        .get<CustomerOrderServiceManagement>(
          API_ENDPOINTS.CustomerServiceRequest.GetCustomerRequestDetail
,
          params
        )
        .subscribe(
          (data) => {
            this.CustomerOrderServiceDetails = data;
            this.seoV2Service.setTitle(
              this. CustomerOrderServiceDetails.serviceName
             );
          },
          (error) => {
            console.error("Error fetching data", error);
            // Optional: Add user-friendly error handling
          }
        )
    );
  }
  private seo() {
    // this.seoV2Service.setMetaImage( '' );
       const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
   
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.MyDashboard.ServiceManagement.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.MyDashboard.ServiceManagement.meta_keywords
        )
      );
      // this.seoService.setMetaTags(translations);
    });
  }
  playAudio() {
    if (this.isBrowser) this.audioPlayer.nativeElement.play();
  }

  // public active = 'Chat';
  public active = "Attachment";
  public showMore: boolean;
  public height: number;
  public width: number;

  // getTrustedHtml(data?:string): SafeHtml {
  //   return this.sanitizer.bypassSecurityTrustHtml(data!);
  // }

  seeMore() {
    this.showMore = !this.showMore;
  }
}
