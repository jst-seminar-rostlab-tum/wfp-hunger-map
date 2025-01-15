import React from 'react';
import { GeoJSON } from 'react-leaflet';

import CountryLoadingProps from '@/domain/props/CountryLoadingProps';

function CountryLoadingLayer({ countryMapData, color }: CountryLoadingProps) {
  return (
    <GeoJSON
      data={countryMapData}
      style={{
        color: 'undefined',
        fillOpacity: 0.3,
        fillColor: color,
        className: 'animate-opacityPulse',
      }}
    />
  );
}

export default CountryLoadingLayer;
