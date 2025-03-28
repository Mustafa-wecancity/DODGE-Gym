import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageCacheService {
  private cache = new Map<string, string>();

  constructor(private http: HttpClient) {}

  getImage(url: string): Observable<string> {
    const cachedImage = this.cache.get(url);
    if (cachedImage) {
      return of(cachedImage);
    } else {
      return this.http.get(url, { responseType: 'blob' }).pipe(
        map(response => {
          const objectURL = URL.createObjectURL(response);
          this.cache.set(url, objectURL);
          return objectURL;
        })
      );
    }
  }
}
