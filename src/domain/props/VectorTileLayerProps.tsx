import { CountryMapDataWrapper } from '../entities/country/CountryMapData';
import { DisputedAreas } from '../entities/DisputedAreas';

export interface VectorTileLayerProps {
  countries: CountryMapDataWrapper;
  disputedAreas?: DisputedAreas;
}
