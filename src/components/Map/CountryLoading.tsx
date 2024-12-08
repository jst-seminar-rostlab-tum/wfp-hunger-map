import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { GeoJSON } from 'react-leaflet';

import CountryLoadingProps from '@/domain/props/CountryLoadingProps';

function CountryLoadingLayer({ data, selectedCountryId, color }: CountryLoadingProps) {
  const filteredFeatures = data.features.filter((feature) => feature?.properties?.adm0_id === selectedCountryId);

  return (
    <GeoJSON
      data={{ type: 'FeatureCollection', features: filteredFeatures } as FeatureCollection<Geometry, GeoJsonProperties>}
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
