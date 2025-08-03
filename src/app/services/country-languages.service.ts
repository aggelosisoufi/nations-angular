import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Country } from '../models/country.model';

@Injectable({ providedIn: 'root' })
export class CountryLanguagesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/country-languages`;

  getLanguagesByCountryId(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/${id}`);
  }
}
