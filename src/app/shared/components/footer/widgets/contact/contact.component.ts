import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-contact',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class FooterContactComponent {

  @Input() data: Option | null;

}
