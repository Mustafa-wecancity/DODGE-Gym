import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel';
 import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
 import { FormsModule } from '@angular/forms';
import {  environment } from '../../../../../environments/environment.development';
import { Bundle } from '../../../../shared/interface/Models/Bundle/PaginationModel';
import { ApiForImageForReport } from '../../../../shared/interface/Models/appSetting';
import { RouterLink } from '@angular/router';
import { CustomPipeForImagesPipe } from '../../../../shared/pipe/custom-pipe-for-images-pipe.pipe';
import { CommonModule } from '@angular/common';
import { GenericService } from '../../../../shared/Api-Services/generic.service';
import { API_ENDPOINTS } from '../../../../shared/Api-Services/API_ENDPOINTS';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TitleComponent } from '../../../../shared/components/widgets/title/title.component';
import { LazyLoadDirective } from '../../../../shared/directive/lazy-load.directive';
import { SummaryPipe } from '../../../../shared/pipe/summary.pipe';
@Component({
  selector: 'app-save-offer',
  standalone: true,
  imports: [TranslateModule, CarouselModule, FormsModule,RouterLink,CustomPipeForImagesPipe,CommonModule,RouterLink,TitleComponent,LazyLoadDirective,SummaryPipe
            ],
  templateUrl: './save-offer.component.html',
  styleUrl: './save-offer.component.scss'
})
export class SaveOfferComponent {

  @Input() class:string="pfor"
  @Input() ISliderFull:boolean=true;
  @Input() home:boolean=false;
  @Input() Bundle?: Bundle[]
  Bundle_: Bundle[];
  public bannerSlider :OwlOptions= data.bannerSlider_;
  public customOptionsItem1 = data.customOptionsItem1;
  public storageURL = ApiForImageForReport;
  public imageDefault = environment.imageDefault;
constructor( public _homeService: GenericService) {
  this.get()

  console.log(data.bannerSlider_)
}
  copyFunction(txt:string){
    navigator.clipboard.writeText(txt);
  }
  get(){
    
    const params2 = { TopCount: 8 };
  this._homeService.subscription.add(
    this._homeService
    .getAll<Bundle>(API_ENDPOINTS.Home.GetBundleListForHome)
    .subscribe(
      (data) => {
        this.Bundle_ = data;
        console.log(data)
      },
      (error) => {
        console.error("Error fetching data", error);
      }
    )
  );
}
setPathDecodeURIComponent(path:string) {
  //  return decodeURIComponent(path);
   return path.replace(/[ .]/g, '-'); // Replace spaces with underscores

}

}