export interface CountryFcsData {
  fcs: number;
  fcs_people_total: number;
}

export type GlobalFcsData = Record<string, CountryFcsData>;
