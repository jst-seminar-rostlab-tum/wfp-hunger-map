import { FeatureCollection, Geometry } from 'geojson';

import { CountryFcsData } from '@/domain/entities/country/CountryFcsData.ts';

import { CountryProps } from '../entities/country/CountryMapData';

export default interface FcsChoroplethProps {
  data: FeatureCollection<Geometry, CountryProps>;
  countryId: number;
  fcsData: Record<string, CountryFcsData>;
  onDataUnavailable: () => void;
}
