import { Geometry } from './Geometry';

export interface Feature<T> {
  type: string;
  geometry: Geometry;
  properties: T;
}
