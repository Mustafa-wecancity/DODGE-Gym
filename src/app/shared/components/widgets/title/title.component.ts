import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {

  @Input() class: string = 'title';
  @Input() svg: string = 'Layer_1';
  @Input() style: string;
  @Input() title?: string;
  @Input() description?: string;
  
}
