import { Component, Input } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import * as data from  '../../../../shared/data/owl-carousel';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CommonModule } from '@angular/common';
import { SidebarForCategoriesComponent } from './../widgets/sidebar/sidebar.component';
import { subCategoriesComponent } from './../widgets/sub-categories/sub-categories.component';
import { IParentCategoryAndServices, ISlider } from '../../../../shared/interface/Models/Category/CategoryModel';
import { CategoryServiceProdctComponent } from '../widgets/category-service/category-service.component';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [subCategoriesComponent, SidebarForCategoriesComponent, CategoryServiceProdctComponent,CommonModule],

  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryServiceComponent {

  
  @Input() filter: Params;
  @Input() ParentCategoryAndServices: IParentCategoryAndServices|null;
  // @Input() slider:ISlider;

  public categorySlider = data.categorySlider9;

  constructor(public attributeService: AttributeService) {
  }

}
