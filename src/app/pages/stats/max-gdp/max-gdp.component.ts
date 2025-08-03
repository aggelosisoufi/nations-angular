import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CountryStatsService } from '../../../services/country-stats.service';
import { CountryMaxGdp } from '../../../models/country-max-gdp.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-max-gdp',
  standalone: true,
  imports: [MatTableModule, DecimalPipe],
  templateUrl: './max-gdp.component.html',
  styleUrls: ['./max-gdp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaxGdpComponent {
  private statsService = inject(CountryStatsService);
  readonly stats = signal<CountryMaxGdp[]>([]);
  displayedColumns = ['name', 'countryCode3', 'year', 'population', 'gdp'];

  constructor() {
    this.loadStats();
  }

  loadStats(): void {
    this.statsService.getMaxGdpPerPopulation().subscribe({
      next: (res) => this.stats.set(res),
      error: (err) => console.error(err)
    });
  }
}
