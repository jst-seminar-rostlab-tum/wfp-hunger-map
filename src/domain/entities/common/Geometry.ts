export interface Geometry {
  type: string;
  coordinates: number[][][]; // Maybe a common type is not best idea here, the coordinate arrays seem to have different dephts.
}
