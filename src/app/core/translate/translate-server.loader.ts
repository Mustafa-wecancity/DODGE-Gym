import { join } from 'path';
import { Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import * as fs from 'fs';
import { environment } from '../../../environments/environment.development';

export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private prefix: string = 'i18n',
    private suffix: string = '.json',
  ) {
  }

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const assetsFolder = join(
        process.cwd(),
        'dist',
        'DepointWeb-ssr', // Your project name here
        'browser',
        'assets',
        this.prefix,
      );
 
      const jsonData = JSON.parse(
        fs.readFileSync(`${environment.langJson}/${lang}`, 'utf8'),
      );

      observer.next(jsonData);
      observer.complete();
    });
  }
}

export function translateServerLoaderFactory(): TranslateLoader {
  return new TranslateServerLoader();
}
