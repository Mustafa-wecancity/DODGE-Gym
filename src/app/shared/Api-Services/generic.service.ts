import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription, map, catchError, throwError, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PublicService } from './public.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  public subscription = new Subscription();
  public submit: boolean = true;
  private browserLang: any = '';
  currentLangKey: any;
  api: string=environment.baseURL;
  constructor(private http: HttpClient, private publicService: PublicService ) {
 this.currentLangKey=this.publicService.getCurrentLanguage()??'ar'
     }

  // Generic method to get all items
  getAll<T>(endpoint: string, params?: { [key: string]: any }): Observable<T[]> {
    
     let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<T[]>(`${environment.baseURL}${this.publicService.getCurrentLanguage()}/${endpoint}`, { params: httpParams }).pipe(
      map((response: any) => response.data),
      shareReplay(1), // Prevents duplicate HTTP requests
      catchError(this.handleError)
    );
  }

  // Generic method to get an item by ID
  getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${environment.baseURL}${this.publicService.getCurrentLanguage()}/${endpoint}?id=${id}`).pipe(
      map((response: any) => response.data),
      catchError(this.handleError)
    );
  }

  // Generic method to get a single item with params
  get<T>(endpoint: string, params?: { [key: string]: any }): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<T>(`${environment.baseURL}${this.publicService.getCurrentLanguage()}/${endpoint}`, { params: httpParams }).pipe(
      map((response: any) => response.data),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  // Generic method to create a new item
  create<T, TY>(endpoint: string, data: TY): Observable<T> {
    return this.http.post<T>(`${environment.baseURL}${this.publicService.getCurrentLanguage()}/${endpoint}`, data).pipe(
      map((response: any) => response),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  // Generic method to update an item by ID
  update<T, TY>(endpoint: string, id: number, data: TY): Observable<T> {
    return this.http.put<T>(`${environment.baseURL}${this.publicService.getCurrentLanguage()}/${endpoint}/${id}`, data).pipe(
      map((response: any) => response.data),
      catchError(this.handleError)
    );
  }

  // Generic method to delete an item by ID
  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseURL}${this.publicService.getCurrentLanguage()}/${endpoint}/id?${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors from HTTP requests
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log error to the console (or send to a logging service)
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private ensureLanguage(): void {
    if (!this.currentLangKey) {
      this.currentLangKey = this.publicService.getCurrentLanguage() || 'ar';
    }
  }

  // Unsubscribe method to prevent memory leaks
  unsubscribe() {
    // if (this.subscription && !this.subscription.closed) {
    //   this.subscription.unsubscribe();
    // }
  }
}
