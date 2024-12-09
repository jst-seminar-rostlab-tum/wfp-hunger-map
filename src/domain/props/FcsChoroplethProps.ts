import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';

export default interface FcsChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryId: number;
  loading: boolean;
  regionData?: FeatureCollection<Geometry, GeoJsonProperties>;
  countryData?: CountryData;
  countryIso3Data?: CountryIso3Data;
  selectedCountryName?: string;
}
