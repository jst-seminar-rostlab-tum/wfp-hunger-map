import { FeatureCollection, Geometry } from 'geojson';

import { CountryProps } from '../entities/country/CountryMapData';

export default interface NutritionChoroplethProps {
  data: FeatureCollection<Geometry, CountryProps>;
  countryId: number;
  onDataUnavailable: () => void;
}
