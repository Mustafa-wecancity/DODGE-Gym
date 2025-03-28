import { Component, Input } from '@angular/core';
import { Blog } from '../../../../shared/interface/blog.interface';
import { RouterModule } from '@angular/router';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { CommonModule } from '@angular/common';
import { GenericService } from '../../../../shared/Api-Services/generic.service';
import { GenericResponse } from '../../../../shared/interface/Models/generic-response';
import { ITPagination } from '../../../../shared/interface/Models/Pagination/pagination';
import { IRecentNewsHome } from '../../../../shared/interface/Models/Bundle/PaginationModel';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { API_ENDPOINTS } from '../../../../shared/Api-Services/API_ENDPOINTS';
import { pager } from '../../../../shared/interface/core.interface';
import { CustomPipeForImagesPipe } from '../../../../shared/pipe/custom-pipe-for-images-pipe.pipe';

@Component({
  selector: 'app-recent-post',
  standalone: true,
  imports: [RouterModule, CommonModule, NoDataComponent,CustomPipeForImagesPipe],
  templateUrl: './recent-post.component.html',
  styleUrl: './recent-post.component.scss'
})
export class RecentPostComponent extends BaseComponent {

  @Input() blogs: Blog[];
  constructor(private _NewsService: GenericService) {
    super();
    this.GetNews();
  }

  News: IRecentNewsHome[] = [];  
  GetNews() :void{

this.pager.maxResultCount=4

    this._NewsService.subscription.add(this._NewsService.create<GenericResponse<ITPagination<IRecentNewsHome>>,pager>(API_ENDPOINTS.Home.RecentNews, this.pager).subscribe(
      data => {
        this.News = data.data.items;
 
      },
      error => {
        console.error('Error fetching data', error);
      }
    ));
 

}

setPathDecodeURIComponent(path:string) {
  //  return decodeURIComponent(path);
   return path.replace(/[ .]/g, '-'); // Replace spaces with underscores

}
}
