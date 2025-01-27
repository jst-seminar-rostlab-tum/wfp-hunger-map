import { LatLngExpression } from 'leaflet';

import { Feature } from '../common/Feature';

export type CountryProps = {
  OBJECTID: number;
  adm0_name: string;
  map_lab: string;
  adm0_altnm: string;
  iso3: string;
  disp_area: string;
  adm0_id: number;
  source: string;
  validity: number;
  last_modif: string;
  STSCOD: string;
  MAPCLR: string;
  source_adm: string;
  Shape_Leng: number;
  Shape_Area: number;
  interactive?: boolean;
  incomeLevel?: string;
  dataType?: string;
};

/**
 * Stores polygons for countries, as well as whether any alerts are active in the country.
 */
export type CountryMapData = Feature<CountryProps, LatLngExpression[][][] | LatLngExpression[][]>;
export interface CountryMapDataWrapper {
  type: string;
  features: CountryMapData[];
}
