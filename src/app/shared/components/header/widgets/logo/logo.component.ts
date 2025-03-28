import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { Select } from '@ngxs/store';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {

  @Input() textClass: string = 'f-w-600';
  @Input() data: Option | null;
  @Input() logo: string | null | undefined;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

}
