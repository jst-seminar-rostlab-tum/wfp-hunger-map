import React, { useEffect, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import { NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';
import { MapOperations } from '@/operations/map/MapOperations';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

/** NutritionStateChoropleth Component
 * renders the Nutrition Map for country view.
 * @param {NutritionStateChoroplethProps} props - The props of the component
 * @param {regionNutrition} props.Feature - The GeoJSON data of the region
 * @param {setRegionLabelTooltips} props.React.Dispatch<React.SetStateAction<boolean>> - Function to set the region label tooltips
 * @param {regionLabelData} props.FeatureCollection<Geometry, GeoJsonProperties> - The region data which is used to label the region.
 * @param {countryMapData} props.CountryMapData - The map data of the country
 * @param {selectedNutrient} props.NutrientType - The selected nutrient
 * @returns {JSX.Element} GeoJSON
 */

export default function NutritionStateChoropleth({
  regionNutrition,
  setRegionLabelTooltips,
  regionLabelData,
  countryMapData,
  selectedNutrient,
}: NutritionStateChoroplethProps) {
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
