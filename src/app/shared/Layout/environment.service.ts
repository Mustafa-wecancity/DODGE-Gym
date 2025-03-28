import { Injectable } from '@angular/core';
import { LayoutService } from './layout.service';
import { changeEnv } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor(private layoutService: LayoutService) {
    // this.updateEnvironmentLanguage();
  }

  updateEnvironmentLanguage(): void {
    const language = this.layoutService.config.langu;
    changeEnv(language);
  }
}
