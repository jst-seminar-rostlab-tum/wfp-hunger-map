export const country = {
  country: {
    id: 182,
    name: 'Nigeria',
    iso3: 'NGA',
    iso2: 'NG',
  },
  region: {
    id: 2213,
    name: 'Anambra',
    population: 5494926,
  },
  date: '2023-10-30',
  dataType: 'PREDICTION',
  metrics: {
    fcs: {
      people: 1244318,
      prevalence: 0.22644854543992,
    },
    rcsi: {
      people: 1140107,
      prevalence: 0.207483594865518,
    },
  },
};

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

export const TITLE = 'Download Country Data';

export const MOCK_COUNTRIES = ['Nigeria', 'Ghana', 'Kenya', 'Tanzania', 'Uganda'];

export const COUNTRY_ERROR_MSG = 'Country is required';

export const DATE_RANGE_ERROR_MSG = 'Date range is required';

export const DATE_RANGE_TOO_LONG_ERROR_MSG = 'Date range must be less than 500 days';
