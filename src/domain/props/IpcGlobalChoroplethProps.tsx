import { CountryIpcData } from '../entities/country/CountryIpcData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';

export default interface IpcGlobalChoroplethProps {
  ipcData: CountryIpcData[];
  countries: CountryMapDataWrapper;
  setSelectedCountryId: (id: number | null) => void;
  selectedCountryId: number | null;
}
