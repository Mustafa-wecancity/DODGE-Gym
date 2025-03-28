import { Component, Inject, Input, PLATFORM_ID } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NoDataComponent } from "../../../shared/components/widgets/no-data/no-data.component";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { ITPagination } from "../../../shared/interface/Models/Pagination/pagination";
import { pager } from "../../../shared/interface/core.interface";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import {
  IBundleForCustomer,
  Role,
  Status,
} from "../../../shared/interface/Models/Bundle/CustomerBundleCategoriesModel";
import { PaginationComponent } from "../../../shared/components/widgets/pagination/pagination.component";
import { CustomPipeForImagesPipe } from "../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { SeoV2Service } from "../../../shared/services/seo-v2.service";
import { NgSelectModule } from "@ng-select/ng-select";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { isPlatformBrowser, ViewportScroller } from "@angular/common";
import { PublicService } from "../../../shared/Api-Services/public.service";

@Component({
  selector: "app-my-bundles",
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    NgSelectModule,
    PaginationComponent,
    CustomPipeForImagesPipe,
    RouterLink,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./my-bundles.component.html",
  styleUrl: "./my-bundles.component.scss",
})
export class MyBundlesComponent extends BaseComponent {
  public form: FormGroup;

  StatusList: Status[] = [
    { status: Role.Active, title: "MyDashboard.MyBundle.form.Active" },
    { status: Role.Expired, title: "MyDashboard.MyBundle.form.Expired" },
    { status: Role.All, title: "MyDashboard.MyBundle.form.All" },
  ];

  public filter = {
    status: 1,
    page: 1, // Current page number
    paginate: 1, // Display per page,
  };
  @Input() skeletonItems: number[] = [1, 2, 3, 4, 5];
  isBrowser: boolean;

  constructor(
    private viewportScroller: ViewportScroller,
    private formBuilder: FormBuilder,
    private seoV2Service: SeoV2Service,
    private publicService: PublicService,
    private _bundleService: GenericService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super();
    this.seo();
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initForm();
    if (this.isBrowser) {
      this.GetBundles();
    }
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.pager.skipCount = data;
    this.GetBundles();
  }

  public bundles: IBundleForCustomer[] = [];
  GetBundles(): void {
    this.pager.skipCount = (this.filter.page - 1) * this.pager.maxResultCount;

    this._bundleService.subscription.add(
      this._bundleService
        .create<GenericResponse<ITPagination<IBundleForCustomer>>, pager>(
          API_ENDPOINTS.Customer.GetCustomerBundlelist,
          this.pager
        )
        .subscribe(
          (data) => {
            // this.MostOrderedServices = data.data.items;
            this.bundles = data.data.items;
            this.totalCount = data.data.totalCount;
            this.viewportScroller.scrollToPosition([0, 0]);
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }

  //form implementations
  initForm() {
    this.form = this.formBuilder.group({
      statusId: new FormControl(""),
      title: new FormControl(""),
    });
  }
  get fc() {
    return this.form.controls;
  }
  clearFilter() {
    this.form.reset();
    this.pager = {
      maxResultCount: this.pager.maxResultCount,
      skipCount: this.pager.skipCount,
    };

    this.GetBundles();
  }
  applyFilter() {
    const formValues = this.form.getRawValue();
     // تصفية القيم التي ليست null أو undefined
    const filteredFormValues = Object.fromEntries(
      Object.entries(formValues).filter(
        ([_, v]) => v !== null && v !== undefined && v !== ""
      )
    );

    this.pager = {
      maxResultCount: this.pager.maxResultCount,
      ...filteredFormValues,
      skipCount: 0,
    };
    this.filter["page"] = 1;
    this.GetBundles();
  }

  protected onSubmit() {
    // this.submit = false;
    if (!this.fc["statusId"].value || this.fc["statusId"].value == 0) {
      delete this.pager["statusId"]; // is exist
    }
    this.applyFilter();
  }

  //start code ssr
  private seo() {
       const lang =this.publicService.getCurrentLanguage()??'ar'
    this.seoV2Service.loadTranslations(lang).subscribe((translations) => {
      this.seoV2Service.setTitle(translations.MyDashboard.MyBundle.MyBundles);
      this.seoV2Service.setHostUrlIndex();
      this.seoV2Service.setMetaDescription(
        translations.MyDashboard.MyBundle.meta_description
      );
      this.seoV2Service.setMetaKeywords(
        this.seoV2Service.generateKeywords(
          translations.MyDashboard.MyBundle.meta_keywords
        )
      );
    });
  }

  setPathDecodeURIComponent(path:string) {
    //  return decodeURIComponent(path);
     return path.replace(/[ .]/g, '-'); // Replace spaces with underscores

  }
}
