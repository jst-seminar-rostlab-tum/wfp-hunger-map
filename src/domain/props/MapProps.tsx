import { CountryIpcData } from '../entities/country/CountryIpcData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';
import { DisputedAreas } from '../entities/DisputedAreas';
import { GlobalInsight } from '../enums/GlobalInsight';

export interface MapProps {
  countries: CountryMapDataWrapper;
  ipcData: CountryIpcData[];
  disputedAreas?: DisputedAreas;
  selectedMapType?: GlobalInsight;
}
