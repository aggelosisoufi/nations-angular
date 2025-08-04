import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CountryStatsSearchDto } from '../models/country-stats-search.model';
import { CountryStatAdvancedFilter } from '../models/country-stats-filter.model';

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class CountryStatAdvancedService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/country-stats`;

  search(filter: CountryStatAdvancedFilter, page = 0, size = 10, sort = 'year,desc'): Observable<PageResponse<CountryStatsSearchDto>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    return this.http.post<PageResponse<CountryStatsSearchDto>>(
      `${this.baseUrl}/search`,
      filter,
      { params }
    );
  }
}
