export interface ICountry {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
}

export interface IRegion {
  id: number;
  name: string;
  population: number;
}

export interface IMetrics {
  fcs: {
    people: number;
    prevalence: number;
  };
  rcsi: {
    people: number;
    prevalence: number;
  };
}

export interface ICountryData {
  country: ICountry;
  region: IRegion;
  date: string;
  dataType: string;
  metrics: IMetrics;
}

export const DESCRIPTION = 'Select a country and a date range to download its food security data.';

export const TITLE = 'Export Country Food Security Data';

export const COUNTRY_ERROR_MSG = 'Country is required';

export const DATE_RANGE_ERROR_MSG = 'Date range is required';

export const DATE_RANGE_TOO_LONG_ERROR_MSG = 'Date range must be less than 500 days';

export const DOWNLOAD_SUCCESS_MSG = 'Download successful!';

export const DOWNLOAD_ERROR_MSG = 'Download failed!';
