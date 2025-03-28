import {
  Component,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { NgbModule, NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";

import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

import { TranslateModule } from "@ngx-translate/core";
import { ServicesHome } from "../../../../interface/Models/Bundle/PaginationModel";
import { GenericService } from "../../../../Api-Services/generic.service";

import { TruncatePipe } from "../../../../pipe/truncate.pipe";
import { StripHtmlPipe } from "../../../../pipe/strip-html.pipe";
import { LazyLoadDirective } from "../../../../directive/lazy-load.directive";
import { CustomPipeForImagesPipe } from "../../../../pipe/custom-pipe-for-images-pipe.pipe";
import { PublicService } from "../../../../Api-Services/public.service";

@Component({
  selector: "app-services-box",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    TranslateModule,
    LazyLoadDirective,
    CustomPipeForImagesPipe,
    TruncatePipe,
    StripHtmlPipe,
  ],
  templateUrl: "./services-box.component.html",
  styleUrl: "./services-box.component.scss",
})
export class ServicesBoxComponent {
  @Input() service: ServicesHome;
  @Input() class: string;
  @Input() close: boolean;


  public currentDate: number | null;
  public saleStartDate: number | null;

  constructor(
    public _Service: GenericService,
    @Inject(PLATFORM_ID) private platformId: Object,
    config: NgbRatingConfig, public publicService: PublicService,private router: Router
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

  setPathDecodeURIComponent(path: string) {
    //  return decodeURIComponent(path);
    return path.replace(/[ .]/g, "-"); // Replace spaces with underscores
  }
}
