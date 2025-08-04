import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CountriesListComponent } from './pages/countries/countries-list/countries-list.component';
import { CountryLanguagesComponent } from './pages/countries/country-languages/country-languages.component';
import { MaxGdpComponent } from './pages/stats/max-gdp/max-gdp.component';
import { CountryStatsComponent } from './pages/stats/country-stats/country-stats.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'countries', pathMatch: 'full' },
      { path: 'countries', component: CountriesListComponent },
      { path: 'countries/:id/languages', component: CountryLanguagesComponent },
      { path: 'stats/max-gdp', component: MaxGdpComponent },
      { path: 'stats/search', component: CountryStatsComponent }
    ]
  }
];
