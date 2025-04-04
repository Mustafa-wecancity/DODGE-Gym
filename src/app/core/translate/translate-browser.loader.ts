import { Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export class TranslateBrowserLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
  ) {
  }

  public getTranslation(lang: string): Observable<unknown> {
    return new TranslateHttpLoader(this.http, environment.langJson + '/', '').getTranslation(lang);
  }
}




export function translateBrowserLoaderFactory(
  httpClient: HttpClient,
): TranslateBrowserLoader {
  return new TranslateBrowserLoader(httpClient);
}
