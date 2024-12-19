import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import FscCountryChoroplethProps from '@/domain/props/FcsCountryChoroplethProps';
import { FcsCountryChoroplethOperations } from '@/operations/map/FcsCountryChoroplethOperations';

export default function FscCountryChoropleth({
  regionData,
  regionLabelData,
  countryMapData,
  setRegionLabelTooltips,
}: FscCountryChoroplethProps) {
  const map = useMap();

  return (
    <div>
      <GeoJSON
        data={regionData}
        style={FcsCountryChoroplethOperations.styleFunction}
        onEachFeature={(feature, layer) =>
          FcsCountryChoroplethOperations.onEachFeature(
            feature,
            layer,
            regionData,
            regionLabelData,
            countryMapData,
            map,
            setRegionLabelTooltips
          )
        }
      />
    </div>
  );
}
