import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

export interface IpcChoroplethProps {
  ipcData: CountryIpcData[];
  countries: CountryMapDataWrapper;
  selectedCountryId: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
  handleBackButtonClick?: () => void;
  countryData?: CountryData;
  ipcRegionData?: FeatureCollection<Geometry, GeoJsonProperties>;
  selectedCountryName?: string;
}
