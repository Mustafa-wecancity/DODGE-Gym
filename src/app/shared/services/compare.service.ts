import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CompareModel } from '../interface/compare.interface';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  public skeletonLoader: boolean = false;
  
  constructor(private http: HttpClient) { }

  getComparItems(): Observable<CompareModel> {
    return this.http.get<CompareModel>(`${environment.URL}/compare.json`);
  }
 
}
