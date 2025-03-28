import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { Footer } from '../../../../../shared/interface/theme.interface';
import { SettingState } from '../../../../state/setting.state';
import { Values } from '../../../../interface/setting.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-logo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class FooterLogoComponent {

  @Input() data: Option | null;
  
  @Input() footer: Footer;

  @Select(SettingState.setting) setting$: Observable<Values>;


}
