import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-copyright',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './copyright.component.html',
  styleUrl: './copyright.component.scss'
})
export class FooterCopyrightComponent {

  // @Input() data: Option | null;

}
