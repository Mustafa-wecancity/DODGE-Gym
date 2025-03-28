import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss'
})
export class CallComponent {

  @Input() data: Option | null;
  @Input() style: string = 'basic';

}
