import { LatLngExpression, LatLngTuple } from 'leaflet';

export default class GeometryOperations {
  static swapCoords(coords: LatLngExpression): LatLngExpression {
    if (!GeometryOperations.isLatLngTuple(coords)) {
      throw Error('Invlaid coordinate array');
    }

    return [coords[1], coords[0]];
  }

  static isLatLngTuple(value: LatLngExpression): value is LatLngTuple {
    return Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number';
  }
}
