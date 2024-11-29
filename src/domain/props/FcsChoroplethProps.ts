import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { AlertType } from '../enums/AlertType';

export default interface FcsChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryId: number;
  selectedCountryId: number | null;
  selectedAlert: AlertType | null;
  setSelectedCountryId: (countryId: number) => void;
  setSelectedMapVisibility: (visibility: boolean) => void;
  toggleAlert: (alertType: AlertType) => void;
}
