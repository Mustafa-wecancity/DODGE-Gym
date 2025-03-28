import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IGetCategory } from '../../../../shared/interface/Models/Category/CategoryModel';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { RouterLink } from '@angular/router';
import { CustomPipeForImagesPipe } from '../../../../shared/pipe/custom-pipe-for-images-pipe.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { GenericService } from '../../../../shared/Api-Services/generic.service';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { API_ENDPOINTS } from '../../../../shared/Api-Services/API_ENDPOINTS';
import { LazyLoadDirective } from '../../../../shared/directive/lazy-load.directive';

@Component({
  selector: 'app-categories-home',
  standalone: true,
  imports: [NoDataComponent,RouterLink,CustomPipeForImagesPipe,TranslateModule,CarouselModule,LazyLoadDirective],
  templateUrl: './categories-home.component.html',
  styleUrl: './categories-home.component.scss'
})
export class CategorieimagesHomeComponent extends BaseComponent {

    categories: IGetCategory[] = [];
  @Input() style: string = 'vertical';
  @Input() sliderOption: OwlOptions;
  @Input() image?: string;

  constructor( public _homeService: GenericService) {
    super();
  }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.get()
}
  get(){
     this._homeService.subscription.add(
       this._homeService
         .getAll<IGetCategory>(API_ENDPOINTS.Home.GetAllHomeCategory)
         .subscribe(
           (data) => {
             this.categories = data;
           },
           (error) => {
             console.error("Error fetching data", error);
           }
         )
     );}

 
}
