import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CountryStatAdvancedService } from '../../../services/country-stat-advanced.service';
import { CountryStatsSearchDto } from '../../../models/country-stats-search.model';
import { CountryStatAdvancedFilter } from '../../../models/country-stats-filter.model';
import { DecimalPipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { RegionDto } from '../../../models/region';
import { RegionService } from '../../../services/region.service';

@Component({
  selector: 'app-country-stats',
  standalone: true,
  imports: [
    // Angular Common
    NgClass,
    DecimalPipe,
    FormsModule, ReactiveFormsModule,

    // Angular Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './country-stats.component.html',
  styleUrls: ['./country-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryStatsComponent {
  private statsService = inject(CountryStatAdvancedService);
  private fb = inject(FormBuilder);
  private regionService = inject(RegionService);

  readonly stats = signal<CountryStatsSearchDto[]>([]);
  readonly totalElements = signal<number>(0);
  readonly regions = signal<RegionDto[]>([]);

  displayedColumns = ['countryName', 'regionName', 'year', 'population', 'gdp'];
  pageIndex = 0;
  pageSize = 10;
  sort: string = 'year,desc';

  filterForm = this.fb.group({
    regionId: [null],
    yearFrom: [2000, [Validators.min(1900), Validators.required]],
    yearTo: [2020, [Validators.max(2100), Validators.required]]
  });

  ngOnInit() {
    this.regionService.getRegions().subscribe({
      next: (res) => this.regions.set(res),
      error: (err) => console.error(err)
    });
    this.loadStats();
  }

  private buildFilter(): CountryStatAdvancedFilter {
    const f = this.filterForm.value;
    const filter: CountryStatAdvancedFilter = {};

    if (f.regionId) {
      filter.regionId = { equals: f.regionId };
    }
    if (f.yearFrom || f.yearTo) {
      filter.year = { from: f.yearFrom ?? undefined, to: f.yearTo ?? undefined };
    }

    return filter;
  }

  loadStats() {
    this.statsService.search(this.buildFilter(), this.pageIndex, this.pageSize, this.sort)
      .subscribe({
        next: (res) => {
          this.stats.set(res.content);
          this.totalElements.set(res.totalElements);
        },
        error: (err) => console.error(err)
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadStats();
  }

  onSortChange(sort: Sort) {
    this.sort = `${sort.active},${sort.direction || 'asc'}`;
    this.loadStats();
  }

  onApplyFilters() {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }
    this.pageIndex = 0;
    this.loadStats();
  }

  onResetFilters() {
    this.filterForm.reset({
      regionId: null,
      yearFrom: 2000,
      yearTo: 2020
    });
    this.pageIndex = 0;
    this.loadStats();
  }
}
