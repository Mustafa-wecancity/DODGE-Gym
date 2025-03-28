import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { Select } from '@ngxs/store';
import { PaginationComponent } from '../../shared/components/widgets/pagination/pagination.component';
import { SkeletonBlogComponent } from './skeleton-blog/skeleton-blog.component';
import { SummaryPipe } from '../../shared/pipe/summary.pipe';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../shared/components/widgets/no-data/no-data.component';
import { CustomPipeForImagesPipe } from '../../shared/pipe/custom-pipe-for-images-pipe.pipe';
import { ThemeOptionState } from '../../shared/state/theme-option.state';
import { Observable } from 'rxjs';
import { Option } from '../../shared/interface/theme-option.interface';
import { BaseComponent } from '../../shared/components/base/base.component';
import { GenericResponse } from '../../shared/interface/Models/generic-response';
import { ITPagination } from '../../shared/interface/Models/Pagination/pagination';
import { pager } from '../../shared/interface/core.interface';
import { API_ENDPOINTS } from '../../shared/Api-Services/API_ENDPOINTS';
import { GenericService } from '../../shared/Api-Services/generic.service';
import { IGetBundleList } from '../../shared/interface/Models/CustomerPackage/CustomerPackageService';
 import { AuthService } from '../../shared/services/auth.service';
import { SeoV2Service } from '../../shared/services/seo-v2.service';
import { TitleComponent } from '../../shared/components/widgets/title/title.component';
import { ErrorService } from '../../shared/services/error.service';
import { PublicService } from '../../shared/Api-Services/public.service';

@Component({
  selector: 'app-bundle-list',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    CommonModule,
    SummaryPipe,
    SkeletonBlogComponent,
    PaginationComponent,
    NoDataComponent,
    CustomPipeForImagesPipe,TitleComponent
  ],
  templateUrl: './bundle-list.component.html',
  styleUrl: './bundle-list.component.scss'
})
export class BundleListComponent extends BaseComponent {
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  public isScrollActive = false;

  public filter = {
    page: 1, // Current page number
    paginate: 12, // Display per page,
    status: 1,
  };
  public Bundles: IGetBundleList[] = [];
  public skeletonItems = Array.from({ length: 9 }, (_, index) => index);

  public style: string = "grid_view";
  public sidebar: string = "no_sidebar";

  constructor(
    private _BundlesService: GenericService,private _AuthService :AuthService ,
    private seoV2Service: SeoV2Service,
 
      @Inject(PLATFORM_ID) private platformId: Object,private router :Router, private publicService: PublicService

  ) {
    super();
    this.GetBundles();
    this.seo(); 

  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.GetBundles();
  }
  GetBundles(): void {
    this.pager.skipCount = (this.filter.page - 1) * this.pager.maxResultCount;

    this._BundlesService.subscription.add(
      this._BundlesService
        .create<GenericResponse<ITPagination<IGetBundleList>>, pager>(
          API_ENDPOINTS.Bundle.GetBundleList,
          this.pager
        )
        .subscribe(
          (data:any) => {
            // this.MostOrderedServices = data.data.items;
        
            this.Bundles = data.data.items;
            this.totalCount = data.data.totalCount;
          },
          (error:any) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }


 
  public bundleQty: number = 1;
  public totalPrice: number = 0;
  
  updateQuantity(qty: number) {
    if(1 > this.bundleQty + (qty)) return;
    this.bundleQty = this.bundleQty + (qty);
  }

   _ErrorService = inject(ErrorService);

 
  private seo(){
    // this.seoV2Service.setMetaImage( '' );
    const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe(translations => {
      this.seoV2Service.setTitle(translations.Bundle.header.Title);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaImageStatic("assets/images/pageList/Bundles.jpg");

      this.seoV2Service.setMetaDescription(translations.Bundle.header.meta_description)
      this.seoV2Service.setMetaKeywords(this.seoV2Service.generateKeywords(translations.Bundle.header.meta_keywords))
      // this.seoService.setMetaTags(translations);
    });

  }

  
  // @HostListener("window:scroll", ["$event"])
  // onScroll() {
  //   const button = document.querySelector(".scroll-button");
  //   if (button && this.platformId) {
  //     const buttonRect = button.getBoundingClientRect();
  //     if (buttonRect.bottom < window.innerHeight && buttonRect.bottom < 0) {
  //       this.isScrollActive = true;
  //       document.body.classList.add("stickyCart");
  //     } else {
  //       this.isScrollActive = false;
  //       document.body.classList.remove("stickyCart");
  //     }
  //   }
  // }
  setPathDecodeURIComponent(path:string) {
    //  return decodeURIComponent(path);
     return path.replace(/[ .]/g, '-'); // Replace spaces with underscores

  }
}
