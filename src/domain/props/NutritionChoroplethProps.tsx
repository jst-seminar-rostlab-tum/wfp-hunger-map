import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { AlertType } from '../enums/AlertType';

export default interface NutritionChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryId: number;
  selectedAlert: AlertType | null;
  selectedCountryId?: number;
  setSelectedCountryId: (countryId?: number) => void;
  toggleAlert: (alertType: AlertType) => void;
}
