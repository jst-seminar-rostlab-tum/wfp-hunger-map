import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '../entities/country/CountryData';
import { CountryIpcData } from '../entities/country/CountryIpcData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';

export default interface IpcGlobalChoroplethProps {
  ipcData: CountryIpcData[];
  countries: CountryMapDataWrapper;
  setSelectedCountryId: (id: number | null) => void;
  setIpcRegionData: (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void;
  setCountryData: (countryData: CountryData) => void;
  setCountryName: (data: string | null) => void;
  resetAlert: () => void;
  selectedCountryId: number | null;
}
