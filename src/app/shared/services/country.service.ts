import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Country } from "../interface/country.interface";

@Injectable({
  providedIn: "root",
})
export class CountryService {

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.URL}/country.json`);
  }

}
