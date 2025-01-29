export interface CountryFcsData {
  fcs: number;
  fcs_people_total: number;
  country_name: string;
}

export type GlobalFcsData = Record<string, CountryFcsData>;
