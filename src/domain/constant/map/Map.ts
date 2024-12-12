import { LatLngBoundsExpression } from 'leaflet';

export const MAP_MAX_ZOOM = 6;
export const MAP_MIN_ZOOM = 3;
export const oceanBounds: LatLngBoundsExpression = [
  [-90, -180],
  [90, 180],
];
export const countryBaseStyle = {
  fillColor: 'hsl(var(--nextui-countriesBase))',
  fillOpacity: 1,
  weight: 0,
};

export const countryBorderStyle = {
  color: 'hsl(var(--nextui-countryBorders))',
  weight: 1,
  fillOpacity: 0,
};
export const disputedAreaStyle = {
  fillOpacity: 0,
  color: 'black',
  weight: 1,
  dashArray: '5,5',
};
