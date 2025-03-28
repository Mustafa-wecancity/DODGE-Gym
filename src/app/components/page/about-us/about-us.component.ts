import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import {  Option } from '../../../shared/interface/theme-option.interface';
import * as data from  '../../../shared/data/owl-carousel';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { environment } from '../../../../environments/environment.development';
import { LayoutService } from '../../../shared/Layout/layout.service';
import { SeoV2Service } from '../../../shared/services/seo-v2.service';

export interface Clients {
  title: string;
  count: string;
  imageIcon: string
  description: string
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [TranslateModule, RouterModule, CarouselModule,
             NoDataComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;

  public storageURL = environment.storageURL;

  public productSlider = data.productSliderMargin;
 
  public clientsOptions: OwlOptions = {
    loop:true,
    margin:20,
    items: 3,
    autoplay:true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  public teamOptions: OwlOptions = {
    loop:true,
    margin:20,
    items: 4,
    autoplay:true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  public testimonialsOptions: OwlOptions = {
    loop:true,
    margin:20,
    items: 4,
    // autoplay:true,
    center:true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  public blogOptions: OwlOptions = {
    loop:true,
    margin:20,
    items: 4,
    autoplay:true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
  }
/**
 *
 */
constructor(
  private seoV2Service: SeoV2Service,
  private layoutService: LayoutService,
) {
  
  this.seo();
}

private seo(){
  // this.seoV2Service.setMetaImage( '' );
  this.seoV2Service.setTitle('translations.Home.header.Title');

  // const lang = this.layoutService.config.langu;
  // this.seoV2Service.loadTranslations(lang).subscribe(translations => {
  //   this.seoV2Service.setTitle(translations.Home.header.Title);
  //   this.seoV2Service.setHostUrlIndex();
  //   this.seoV2Service.setMetaDescription(translations.Home.header.meta_description)
  //   this.seoV2Service.setMetaKeywords(this.seoV2Service.generateKeywords(translations.Home.header.meta_description))
  //   // this.seoService.setMetaTags(translations);
  // });

}

}
