import React, { useEffect, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import { NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';
import { MapOperations } from '@/operations/map/MapOperations';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

/** NutritionStateChoropleth Component
 * renders the Nutrition Map for country view.
 * @param {NutritionStateChoroplethProps} props - The props of the component.
 * @param {FeatureCollection} props.regionNutrition - The GeoJSON data of the region.
 * @param {(tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void} props.setRegionLabelTooltips - Function to set the region label tooltips.
 * @param {FeatureCollection<Geometry, GeoJsonProperties>} props.regionLabelData - The region data used for labeling.
 * @param {CountryMapData} props.countryMapData - The map data of the country.
 * @param {NutrientType} props.selectedNutrient - The selected nutrient.
 * @returns {JSX.Element} - The rendered NutritionStateChoropleth component
 */

export default function NutritionStateChoropleth({
  regionNutrition,
  setRegionLabelTooltips,
  regionLabelData,
  countryMapData,
  selectedNutrient,
}: NutritionStateChoroplethProps): JSX.Element {
  const layersRef = useRef<LayerWithFeature[]>([]);
  const selectedNutrientRef = useRef<NutrientType>(selectedNutrient);
  const map = useMap();

  useEffect(() => {
    selectedNutrientRef.current = selectedNutrient;
  }, [selectedNutrient]);

  // based on the selected nutrient -> update tooltip
  useEffect(() => {
    layersRef.current.forEach((layer) => {
      const { feature } = layer;
      NutritionStateChoroplethOperations.addNutritionTooltip(layer, feature, selectedNutrient);
    });
  }, [selectedNutrient, regionNutrition]);

  return (
    <GeoJSON
      data={regionNutrition}
      style={(feature) => NutritionStateChoroplethOperations.dynamicStyle(feature, selectedNutrient)}
      onEachFeature={(feature, layer) => {
        layersRef.current.push(layer);
        NutritionStateChoroplethOperations.addNutritionTooltip(layer, feature, selectedNutrient);
        NutritionStateChoroplethOperations.addHoverEffect(layer);
        MapOperations.setupRegionLabelTooltip(feature, regionLabelData, countryMapData, map, setRegionLabelTooltips);
      }}
    />
  );
}
