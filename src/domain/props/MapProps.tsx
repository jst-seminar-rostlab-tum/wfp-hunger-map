import { CountryMapData } from '../entities/country/CountryMapData';
import { DisputedAreas } from '../entities/DisputedAreas';

export interface MapProps {
  countries: CountryMapData;
  disputedAreas: DisputedAreas;
}
