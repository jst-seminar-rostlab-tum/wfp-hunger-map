import { LatLngExpression } from 'leaflet';

import { Geometry } from './Geometry';

export interface Feature<T, U = LatLngExpression[][][]> {
  type: string;
  geometry: Geometry<U>;
  properties: T;
}
