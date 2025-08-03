import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CountriesService } from '../../../services/countries.service';
import { Country } from '../../../models/country.model';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountriesListComponent {
  private countriesService = inject(CountriesService);
  private router = inject(Router);

  readonly countries = signal<Country[]>([]);
  displayedColumns = ['name', 'area', 'countryCode2'];

  constructor() {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getAllCountries().subscribe({
      next: (res) => this.countries.set(res),
      error: (err) => console.error(err)
    });
  }

  onRowClick(country: Country) {
    this.router.navigate(['/countries', country.id, 'languages']);
  }
}
