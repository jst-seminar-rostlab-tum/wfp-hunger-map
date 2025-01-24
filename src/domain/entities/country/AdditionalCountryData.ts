import { Feature } from '../common/Feature';
import { RegionProperties } from '../region/RegionProperties';

export interface AdditionalCountryData {
  type: string;
  'hc-transform': {
    crs: string;
  };
  // One region of the country
  features: (Feature<RegionProperties> & {
    id?: string;
  })[];
}
