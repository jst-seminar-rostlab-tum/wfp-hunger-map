import { Coordinate } from '../common/Coordinate';

export interface CountryAlertData {
  adm0_code: number;
  alerts: {
    fcs: boolean;
    conflict: boolean;
    climateDry: boolean;
    climateWet: boolean;
  };
  centroid?: Coordinate;
}
