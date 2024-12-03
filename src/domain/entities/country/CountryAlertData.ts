import { Coordinate } from '../common/Coordinate';

export interface CountryAlertData {
  adm0_code: string;
  alerts: {
    fcs: boolean;
    conflict: boolean;
    climateDry: boolean;
    climateWet: boolean;
  };
  centroid?: Coordinate;
}
