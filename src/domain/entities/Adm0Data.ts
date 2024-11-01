import { Coordinate } from './common/Coordinate';
import { Geometry } from './common/Geometry';

/**
 * Not really sure what this represents...
 */
export interface Adm0Data {
  type: string;
  geometry: Geometry;
  properties: {
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
    fcs?: number;
    fcs_people_total?: number;
    undernourishment?: number;
    ipcPopulation?: number;
    ipcAreasAnalysis?: string;
    incomeLevel?: string;
    alerts: {
      covid: boolean;
      fcs: boolean;
      marketAccess: boolean;
      conflict: boolean;
      ndvi: boolean;
      climateDry: boolean;
      climateWet: boolean;
    };
    centroid: Coordinate;
    dataType?: string;
  };
}
