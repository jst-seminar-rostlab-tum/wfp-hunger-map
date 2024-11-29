import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

export interface IpcChoroplethProps {
  ipcData: CountryIpcData[];
  countries: CountryMapDataWrapper;
  selectedCountryId: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
  resetAlert: () => void;
}
