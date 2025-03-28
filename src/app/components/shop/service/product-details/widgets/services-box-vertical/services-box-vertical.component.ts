import { Component, Input } from '@angular/core';
import { ServicesHome } from '../../../../../../shared/interface/Models/Bundle/PaginationModel';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency-symbol.pipe';

@Component({
  selector: 'app-services-box-vertical',
  standalone: true,
  imports: [RouterModule, CurrencySymbolPipe],
  providers: [CurrencySymbolPipe],
  templateUrl: './services-box-vertical.component.html',
  styleUrl: './services-box-vertical.component.scss'
})
export class ServicesBoxVerticalComponent {
  @Input() service: ServicesHome;

}
