import React from 'react';
import { GeoJSON } from 'react-leaflet';

import FscCountryChoroplethProps from '@/domain/props/FcsCountryChoroplethProps';
import { FcsCountryChoroplethOperations } from '@/operations/map/FcsCountryChoroplethOperations';

import FcsAccordion from './FcsAccordion';

export default function FscCountryChoropleth({
  regionData,
  countryData,
  countryIso3Data,
  countryName,
  loading,
}: FscCountryChoroplethProps) {
  return (
    <div>
      <FcsAccordion
        countryData={countryData}
        countryIso3Data={countryIso3Data}
        loading={loading}
        countryName={countryName}
      />
      <GeoJSON
        data={regionData}
        style={FcsCountryChoroplethOperations.styleFunction}
        onEachFeature={(feature, layer) => FcsCountryChoroplethOperations.onEachFeature(feature, layer, regionData)}
      />
    </div>
  );
}
