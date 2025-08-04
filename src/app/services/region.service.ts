import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegionDto } from '../models/region';

@Injectable({ providedIn: 'root' })
export class RegionService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/regions`;

  getRegions(): Observable<RegionDto[]> {
    return this.http.get<RegionDto[]>(this.baseUrl);
  }
}
