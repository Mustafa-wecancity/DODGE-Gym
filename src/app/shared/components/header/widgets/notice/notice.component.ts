import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { TopBarContent } from '../../../../interface/theme-option.interface';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { GenericService } from '../../../../Api-Services/generic.service';
import { API_ENDPOINTS } from '../../../../Api-Services/API_ENDPOINTS';
import { ITopBarContent } from '../../../../interface/Models/ServiceRequest/CreateServiceRequestModel';
import { TranslateModule } from '@ngx-translate/core';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [SwiperModule,TranslateModule],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent {

  @Input() content?: TopBarContent[] | undefined;
    @Output() TickersList = new EventEmitter<ITopBarContent[]>(); // Event emitter to notify when the section is in view
  
constructor(
  public _homeService: GenericService,
)
{
  this.GetAllData()
}

Tickers: ITopBarContent[] = [];

  GetAllData(): void {
    // const params = { top: 10 };
 
      // this._homeService
      //   .getAll<ITopBarContent>(API_ENDPOINTS.Tickers.GetTopTickers, params)
      //   .subscribe(
      //     (data) => {
      //       this.Tickers = data;
      //       console.log(this.Tickers)
      //     },
      //     (error) => {
      //       console.error("Error fetching data", error);
      //     }
      //   )
      this._homeService
        .getAll<ITopBarContent>(API_ENDPOINTS.Tickers.GetAllTickers)
        .subscribe(
          (data) => {
            this.Tickers = data;
            this.TickersList.emit(this.Tickers);
           },
          (error) => {
            console.error("Error fetching data", error);
          }
        )

  }
}
