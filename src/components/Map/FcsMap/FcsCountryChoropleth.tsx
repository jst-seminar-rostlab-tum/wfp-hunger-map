import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import FscCountryChoroplethProps from '@/domain/props/FcsCountryChoroplethProps';
import { FcsCountryChoroplethOperations } from '@/operations/map/FcsCountryChoroplethOperations';

/** FscCountryChoropleth function returns a component that displays the choropleth fcs map for a country view
 * @param {FscCountryChoroplethProps} props - The props of the component
 * @param {FscCountryChoroplethProps.regionData} props.regionData - The region data of the country
 * @param {FscCountryChoroplethProps.regionLabelData} props.regionLabelData - The region label data of the country
 * @param {FscCountryChoroplethProps.countryMapData} props.countryMapData - The map data of the country
 * @param {FscCountryChoroplethProps.setRegionLabelTooltips} props.setRegionLabelTooltips - The function to set the region label tooltips
 * @returns {JSX.Element} - The rendered FscCountryChoropleth component
 */

export default function FscCountryChoropleth({
  regionData,
  regionLabelData,
  countryMapData,
  setRegionLabelTooltips,
}: FscCountryChoroplethProps): JSX.Element {
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
