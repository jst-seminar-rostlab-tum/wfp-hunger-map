import { LatLngExpression } from 'leaflet';

import { Geometry } from './Geometry';

export interface Feature<T, U = LatLngExpression[][][]> {
  type: 'Feature';
  geometry: Geometry<U>;
  properties: T;
}
