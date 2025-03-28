import {
  Component,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
} from "@angular/core";
import { IAds } from "../../../../shared/interface/Models/iads";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { CustomPipeForImagesPipe } from "../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { ApiForImageForReport } from "../../../../shared/interface/Models/appSetting";
@Component({
  selector: "app-theme-home-banner",
  standalone: true,

  imports: [CommonModule, CustomPipeForImagesPipe],
  templateUrl: "./home-banner.component.html",
  styleUrl: "./home-banner.component.scss",
})
export class HomeBannerComponent {
  ApiForImage = ApiForImageForReport;
  @Input() ads: IAds[];
  selectedAd: IAds; // Default to desktop
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.updateAdBasedOnScreenSize();
    } else {
      this.selectedAd = this.ads?.[0] || null; // Default for SSR
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.isBrowser) {
      this.updateAdBasedOnScreenSize();
    }
  }
 
    private updateAdBasedOnScreenSize(): void {
      if (this.isBrowser) {
        const width = window.innerWidth;
        const BREAKPOINTS = {
          desktop: 1024,
          ipadPortrait: 768,
          ipad: 600,
        };
  
        if (this.ads?.length === 0) return;
  
        if (width >= BREAKPOINTS.desktop) {
          this.selectedAd = this.ads[0];
        } else if (width > BREAKPOINTS.ipadPortrait && width <= BREAKPOINTS.desktop) {
          this.selectedAd = this.ads[1];
        } else if (width > BREAKPOINTS.ipad && width <= BREAKPOINTS.ipadPortrait) {
          this.selectedAd = this.ads[2];
        } else {
          this.selectedAd = this.ads[3];
        }

      }
    }
    }