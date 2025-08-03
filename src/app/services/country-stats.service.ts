import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryMaxGdp } from '../models/country-max-gdp.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryStatsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/stats`;

  getMaxGdpPerPopulation(): Observable<CountryMaxGdp[]> {
    return this.http.get<CountryMaxGdp[]>(`${this.baseUrl}/max-gdp-per-population`);
  }
}
