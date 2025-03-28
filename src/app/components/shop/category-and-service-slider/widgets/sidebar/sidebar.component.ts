import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { AttributeService } from '../../../../../shared/services/attribute.service';
import { Params } from '../../../../../shared/interface/core.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollectionCategoryFilterComponent } from '../filter/collection-category-filter/collection-category-filter.component';
import { CommonModule } from '@angular/common';
import { FilterInputsTextComponent } from '../filter/filter-inputs-text/filter-inputs-text.component';

@Component({
  selector: 'app-collection-sidebar',
  standalone: true,
  imports: [TranslateModule, NgbModule, CommonModule,
CollectionCategoryFilterComponent,
           FilterInputsTextComponent,

  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarForCategoriesComponent {

  @Input() filter: Params;
  @Input() hideFilter: string[];
// @Input()  sliderInput:ISlider;
@Input() mainCategoryId?: number;


  constructor(private store: Store,
    public attributeService: AttributeService) {
   
  }

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }

}
