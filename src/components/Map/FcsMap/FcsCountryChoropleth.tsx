import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import FscCountryChoroplethProps from '@/domain/props/FcsCountryChoroplethProps';
import { FcsCountryChoroplethOperations } from '@/operations/map/FcsCountryChoroplethOperations';

/** FscCountryChoropleth function returns a component that displays the fcs map for a country view
 * @param {FscCountryChoroplethProps} props - The props of the component.
 * @param {FeatureCollection<Geometry, GeoJsonProperties>} props.regionData - The GeoJSON region data of the country.
 * @param {FeatureCollection<Geometry, GeoJsonProperties>} props.regionLabelData - The GeoJSON region data of the country used to label the region.
 * @param {CountryMapData} props.countryMapData - The detailed map data of the country.
 * @param {(tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void} props.setRegionLabelTooltips - A function to update the region label tooltips.
 * @param {() => void} [props.handleBackButtonClick] - An optional callback for handling the back button click.
 * @returns {JSX.Element} - The rendered FscCountryChoropleth component.
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
