import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { TitleComponent } from '../../../../../../shared/components/widgets/title/title.component';
import { CommonModule } from '@angular/common';
import { RelatedServicesBoxComponent } from '../services-box/services-box.component';
import { ServicesHome } from '../../../../../../shared/interface/Models/Bundle/PaginationModel';
import { BaseComponent } from '../../../../../../shared/components/base/base.component';
import { GenericService } from '../../../../../../shared/Api-Services/generic.service';
import { API_ENDPOINTS } from '../../../../../../shared/Api-Services/API_ENDPOINTS';
import { pager } from '../../../../../../shared/interface/core.interface';
import { ITPagination } from '../../../../../../shared/interface/Models/Pagination/pagination';
import { GenericResponse } from '../../../../../../shared/interface/Models/generic-response';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, TitleComponent,RelatedServicesBoxComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss'
})
export class RelatedProductsComponent extends BaseComponent {

  @Input() title: string;
  @Input() serviceCategoryId: number;
  @Input() ServicesHome: ServicesHome[];

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

 constructor(
   public _Service: GenericService,
 ) {
    super();
  }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getMostViewedServices(this.serviceCategoryId)
  
}
  ngOnChanges() {
 
  }

    getMostViewedServices(id: number) {
      const dataPsot = { ...this.pager, serviceCategoryId: id };
      dataPsot.maxResultCount = 8;
      this._Service.subscription.add(
        this._Service
          .create<GenericResponse<ITPagination<ServicesHome>>, pager>(
            API_ENDPOINTS.Home.MostViewedServices,
            dataPsot
          )
          .subscribe(
            (data) => {
              this.ServicesHome = data.data.items;
            },
            (error) => {
              console.error("Error fetching data", error);
            }
          )
      );
    }

}
