import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../state/theme-option.state';
import { UpdateSession } from '../../../../shared/action/theme-option.action';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cookie.component.html',
  styleUrl: './cookie.component.scss'
})
export class CookieComponent {

  @Select(ThemeOptionState.cookies) cookies$: Observable<boolean>;

  public cookies: boolean = true;

  constructor(private store: Store){
    this.cookies$.subscribe(res => this.cookies = res);
  }

  acceptCookies(value: boolean) {
    this.store.dispatch(new UpdateSession('cookies', value));
  }

}
