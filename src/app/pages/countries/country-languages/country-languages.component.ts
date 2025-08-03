import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../../services/countries.service';

@Component({
  selector: 'app-country-languages',
  standalone: true,
  imports: [],
  templateUrl: './country-languages.component.html',
  styleUrls: ['./country-languages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryLanguagesComponent {
  private route = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);

  readonly languages = signal<string[]>([]);

  constructor() {
    const countryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLanguages(countryId);
  }

  loadLanguages(countryId: number): void {
    this.countriesService.getLanguagesByCountryId(countryId).subscribe({
      next: (res) => this.languages.set(res),
      error: (err) => console.error(err)
    });
  }
}
