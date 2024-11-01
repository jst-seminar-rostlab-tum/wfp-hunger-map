import { Geometry } from '../common/Geometry';
import { RegionProperties } from '../region/RegionProperties';

export interface AdditionalCountryData {
  type: string;
  'hc-transform': {
    crs: string;
  };
  features: {
    // One region of the country (in this case)
    type: string;
    geometry: Geometry;
    properties: RegionProperties;
    id: string;
  }[];
}
