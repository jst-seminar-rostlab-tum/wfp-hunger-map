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
