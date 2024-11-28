import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';

export default interface FcsChoroplethProps {
  countryId: number;
  selectedCountryId: number | undefined;
  countryData: CountryData | undefined;
  countryIso3Data: CountryIso3Data | undefined;
  regionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined;
  countryDataLoading: boolean;
}
