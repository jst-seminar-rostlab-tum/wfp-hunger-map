import React, { useEffect, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import { NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';
import { MapOperations } from '@/operations/map/MapOperations';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

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
    regionNutrition && (
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
    )
  );
}
