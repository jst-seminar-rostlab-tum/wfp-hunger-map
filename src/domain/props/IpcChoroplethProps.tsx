import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

export interface IpcChoroplethProps {
  countries: CountryMapDataWrapper;
  handleBackButtonClick?: () => void;
  countryData?: CountryData;
  ipcRegionData?: FeatureCollection<Geometry, GeoJsonProperties>;
  selectedCountryName?: string;
  isLoadingCountry: boolean;
}
