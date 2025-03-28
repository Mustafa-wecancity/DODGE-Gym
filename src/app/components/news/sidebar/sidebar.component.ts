import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecentPostComponent } from './recent-post/recent-post.component';
  import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { Params } from '@angular/router';
import { AttributeService } from '../../../shared/services/attribute.service';
import { FilterInputsTextForNewsComponent } from './filter-inputs-text/filter-inputs-text.component';
import { NewsTagComponent } from './news-tag/news-tag.component';

@Component({
  selector: 'app-blog-sidebar',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgbModule,
          RecentPostComponent,
            NewsTagComponent,CategoryFilterComponent,FilterInputsTextForNewsComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class BlogSidebarComponent {
  @Input() mainCategoryId?: number;
  @Input() filter: Params;
 

  constructor( public attributeService: AttributeService) {
   
  }

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }

}
