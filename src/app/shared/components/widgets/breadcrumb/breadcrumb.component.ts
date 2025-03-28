import { Component, Input } from '@angular/core';
import { Breadcrumb } from '../../../interface/breadcrumb';
import { RouterModule } from '@angular/router';
import { TitleCasePipe } from '../../../pipe/title-case.pipe';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, TitleCasePipe],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  @Input() breadcrumb: Breadcrumb | null;
  
}
