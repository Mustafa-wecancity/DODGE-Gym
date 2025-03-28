import {
  Component,
  Inject,
  Input,
  PLATFORM_ID,
} from "@angular/core";
import { NgbModule, NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import {
  CommonModule,
} from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ServicesHome } from "../../../../../../shared/interface/Models/Bundle/PaginationModel";
import { TruncatePipe } from "../../../../../../shared/pipe/truncate.pipe";
import { GenericService } from "../../../../../../shared/Api-Services/generic.service";
import { AuthService } from "../../../../../../shared/services/auth.service";
import { API_ENDPOINTS } from "../../../../../../shared/Api-Services/API_ENDPOINTS";
import { GenericResponse } from "../../../../../../shared/interface/Models/generic-response";
import { StripHtmlPipe } from "../../../../../../shared/pipe/strip-html.pipe";
import { PublicService } from "../../../../../../shared/Api-Services/public.service";
import { LazyLoadDirective } from "../../../../../../shared/directive/lazy-load.directive";
import { CustomPipeForImagesPipe } from "../../../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";

@Component({
  selector: "app-related-service-box",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    TranslateModule,
    TruncatePipe,StripHtmlPipe,LazyLoadDirective,CustomPipeForImagesPipe
  ],
  templateUrl: "./services-box.component.html",
  styleUrl: "./services-box.component.scss",
})
export class RelatedServicesBoxComponent {
  @Input() service: ServicesHome;
  @Input() class: string;
  @Input() close: boolean;

  public currentDate: number | null;
  public saleStartDate: number | null;

  constructor(
    public _Service: GenericService,
    private router: Router,

    private _AuthService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    config: NgbRatingConfig, public publicService: PublicService 
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {}

  redirect(path: string): void {
    // Ensure a default language is provided if getCurrentLanguage returns null or undefined
    const language = this.publicService.getCurrentLanguage() ?? 'ar';
    const url = `/${language}${path}`;  // Corrected the URL formation
    this.router.navigateByUrl(url);
}

  
  setPathDecodeURIComponent(path:string) {
    //  return decodeURIComponent(path);
     return path.replace(/[ .]/g, '-'); // Replace spaces with underscores

  }

}
