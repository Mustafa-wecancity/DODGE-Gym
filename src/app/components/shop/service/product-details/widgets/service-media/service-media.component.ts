import { Component, Input } from '@angular/core';
 import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
 import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomPipeForImagesPipe } from '../../../../../../shared/pipe/custom-pipe-for-images-pipe.pipe';
import { LazyLoadDirective } from '../../../../../../shared/directive/lazy-load.directive';
import * as data from  '../../../../../../shared/data/owl-carousel';
import { IServiceMediaList } from '../../../../../../shared/interface/Models/Service/service-get-by-id';
import { SafeUrlPipe } from '../../../../../../shared/pipe/safe-url.pipe';

@Component({
  selector: 'app-service-media',
  standalone: true,
  imports: [TranslateModule, CarouselModule, FormsModule,CustomPipeForImagesPipe,CommonModule,LazyLoadDirective,SafeUrlPipe
  ],
  templateUrl: './service-media.component.html',
  styleUrl: './service-media.component.scss'
})
export class ServiceMediaComponent {

  @Input() class:string="pfor"
  @Input() ISliderFull:boolean=true;
  @Input() serviceMediaList?: IServiceMediaList[]
  public bannerSlider :OwlOptions= data.bannerSlider_;
  public customOptionsItem3 = data.customOptionsItem77;
    public customOptionsItem1 = data.customOptionsItem1;
  
constructor( ) {
  // this.get()
}
  copyFunction(txt:string){
    navigator.clipboard.writeText(txt);
  }
 
setPathDecodeURIComponent(path:string) {
  //  return decodeURIComponent(path);
   return path.replace(/[ .]/g, '-'); // Replace spaces with underscores

}
getEmbedUrl(videoUrl: string): string {
  const videoId = videoUrl.split('v=')[1]?.split('&')[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}
}