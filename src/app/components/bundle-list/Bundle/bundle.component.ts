import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Select } from "@ngxs/store";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { ThemeOptionState } from "../../../shared/state/theme-option.state";
import { Option } from "../../../shared/interface/theme-option.interface";
import { BundleThumbnailComponent } from "../bundle-details/bundle-thumbnail/bundle-thumbnail.component";
import { SaveOfferComponent } from "../../themes/widgets/save-offer/save-offer.component";
import { BundleData, IGetBundleList } from "../../../shared/interface/Models/CustomerPackage/CustomerPackageService";
import { PublicService } from "../../../shared/Api-Services/public.service";

@Component({
  selector: "app-bundle",
  standalone: true,
  imports: [
    CommonModule,
    BundleThumbnailComponent,
    SaveOfferComponent,
  ],
  templateUrl: "./bundle.component.html",
  styleUrls: ["./bundle.component.scss"],
})
export class BundleComponent {
  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;
  public layout: string = "product_digital";
  public isScrollActive = false;
  public bundleGetById!: IGetBundleList;

  private paramMapSubscription!: Subscription;
  // private lang: string;

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoV2Service: SeoV2Service,
    private router: Router,
    public _bundle: GenericService,
    private publicService: PublicService
  ) {
    // this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {
    //   this.layout = params["layout"] || "product_thumbnail";
    // });

    this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
      const slug = params.get("id");
      if (slug) this.GetbundleById(+slug); // Ensure the ID is a number
    });
    // this.lang = this.publicService.getCurrentLanguage() ?? "ar";
  }
 

  GetbundleById(id: number): void {
    this._bundle.subscription.add(
      this._bundle
        .getById<IGetBundleList>(API_ENDPOINTS.Bundle.GetById, id)
        .subscribe(
          (data) => {
            this.bundleGetById = data;
            if (data) {
              this.seoV2Service.setMetaImage(data?.imagePath || "");
              this.seoV2Service.setTitle(data.name);
 const lang = this.publicService.getCurrentLanguage() ?? "ar";
              this.seoV2Service.loadTranslations(lang).subscribe(
                (translations) => {
                  const metaDescription = `${translations.includesNumber} ${data.points} ${translations.pointsAndValidity} ${data.validityDays} ${translations.Bundle.form.Day}`;
                  this.seoV2Service.setMetaDescription(metaDescription);
                },
                (translationError) => {
                  console.error("Error loading translations", translationError);
                }
              );

              if (isPlatformBrowser(this.platformId)) {
                this.publicService.changeTitle(
                  this.setPathDecodeURIComponent(data.name)
                );
                //  this.router.navigate([lang,'/BundleDetails/', data.id,this.setPathDecodeURIComponent(data.name)]);
              }
            }
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }




  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove("stickyCart");
    }
    // this.queryParamsSubscription.unsubscribe();
    this.paramMapSubscription.unsubscribe();
  }

  setPathDecodeURIComponent(path: string) {
    //  return decodeURIComponent(path);
    return path.replace(/[ .]/g, "-"); // Replace spaces with underscores
  }
}
