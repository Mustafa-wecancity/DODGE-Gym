// src/app/services/json-editor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
 
@Injectable({
  providedIn: 'root'
})
export class JsonEditorService {
  private baseUrl = environment.langJson;  // مسار API على الخادم
  // private baseUrl = 'http://localhost:3000/api/json'

  constructor(private http: HttpClient) { }

  getJson(language: string): Observable<any> {
    const url = `${this.baseUrl}/${language}`;
    return this.http.get(url);
  }

  updateJson(language: string, data: any): Observable<any> {
    const url = `${this.baseUrl}/${language}`;
    return this.http.put(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
