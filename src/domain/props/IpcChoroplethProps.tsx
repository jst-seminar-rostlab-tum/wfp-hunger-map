import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

export interface IpcChoroplethProps {
  countries: CountryMapDataWrapper;
  onDataUnavailable: () => void;
}
