import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../../shared/interface/product.interface';
import { Params } from '../../../../../shared/interface/core.interface';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../../shared/components/widgets/pagination/pagination.component';

@Component({
  selector: 'app-category-paginate',
  standalone: true,
  imports: [CommonModule, PaginationComponent],

  templateUrl: './category-paginate.component.html',
  styleUrl: './category-paginate.component.scss'
})
export class CategoryPaginateComponent {



  @Input() filter: Params;

  public totalItems: any = 20;

  constructor(private route: ActivatedRoute,
    private router: Router) {
  }

  setPaginate(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
    });
  }

}

