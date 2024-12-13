import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import FscCountryChoroplethProps from '@/domain/props/FcsCountryChoroplethProps';
import { FcsCountryChoroplethOperations } from '@/operations/map/FcsCountryChoroplethOperations';

import FcsAccordion from './FcsAccordion';

export default function FscCountryChoropleth({
  regionData,
  countryData,
  countryIso3Data,
  countryName,
  loading,
  regionLabelData,
  countryMapData,
}: FscCountryChoroplethProps) {
  const map = useMap();

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
        onEachFeature={(feature, layer) =>
          FcsCountryChoroplethOperations.onEachFeature(feature, layer, regionData, regionLabelData, countryMapData, map)
        }
      />
    </div>
  );
}
