import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../../../shared/interface/tag.interface';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { INewsKeywordsTag } from '../../../../shared/interface/Models/Bundle/PaginationModel';
import { GenericService } from '../../../../shared/Api-Services/generic.service';
import { API_ENDPOINTS } from '../../../../shared/Api-Services/API_ENDPOINTS';
import { CommonModule } from '@angular/common';
import { SeoV2Service } from '../../../../shared/services/seo-v2.service';

@Component({
  selector: 'app-news-tag',
  standalone: true,
  imports: [RouterModule, NoDataComponent ,CommonModule],
  templateUrl: './news-tag.component.html',
  styleUrl: './news-tag.component.scss'
})
export class NewsTagComponent implements OnInit {
  @Input() filter: Params;
  tagId:string;
 tags: INewsKeywordsTag[];
 constructor(    private _NewsService: GenericService,private router:Router,    private route: ActivatedRoute,    private seoV2Service: SeoV2Service,
 
 )
{
this.GetTopNewsByViews();
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 this.tagId= this.filter['tag'] ??"";
  
}
GetTopNewsByViews(): void {
  this._NewsService.subscription.add(
    this._NewsService
   .getAll<INewsKeywordsTag>(
          API_ENDPOINTS.News.GetTopNewsByViews
        )
      .subscribe(
        (data) => {
       
          this.tags = data;
          // this.seoV2Service.NewsKeywordsTag(
          //   data
          // );
         
        },
        (error) => {
          console.error("Error fetching data", error);
        }
      )
  );
}
applyFilter(tagId :number) {
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: {
      tag: tagId? tagId: null,
      category:  null,
      page: 1
    },
    queryParamsHandling: "merge", // preserve the existing query params in the route
    skipLocationChange: false, // do trigger navigation
  });
}

}
