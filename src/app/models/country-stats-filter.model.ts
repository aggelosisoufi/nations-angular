// Generic filter interface (aligns with BaseFilter in backend)
export interface BaseFilter<T> {
  equals?: T;
  from?: T;
  to?: T;
  inValues?: T[];
}

// Page 3 filter DTO
export interface CountryStatAdvancedFilter {
  regionId?: BaseFilter<number>;
  year?: BaseFilter<number>;
  population?: BaseFilter<number>;
  gdp?: BaseFilter<number>;
}
