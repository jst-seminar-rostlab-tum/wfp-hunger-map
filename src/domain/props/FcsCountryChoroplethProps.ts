import { FeatureCollection, Geometry } from 'geojson';

import { CountryProps } from '@/domain/entities/country/CountryMapData.ts';

export default interface FscCountryChoroplethProps {
  countryMapData: FeatureCollection<Geometry, CountryProps>;
  onDataUnavailable: () => void;
}
