import { CountryMapData, CountryMapDataWrapper } from '../entities/country/CountryMapData';
import { DisputedAreas } from '../entities/DisputedAreas';

export interface MapProps {
  countries: CountryMapDataWrapper;
  disputedAreas: DisputedAreas;
  onCountryClick?: (country: CountryMapData) => void;
}
