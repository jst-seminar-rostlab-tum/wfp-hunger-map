import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import { NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

import NutritionAccordion from './NutritionAccordion';

export default function NutritionStateChoropleth({
  regionNutrition,
  regionData,
  countryName,
}: NutritionStateChoroplethProps) {
  const layersRef = useRef<LayerWithFeature[]>([]);

  const [selectedNutrient, setSelectedNutrient] = useState<NutrientType>(NutrientType.MINI_SIMPLE);

  const selectedNutrientRef = useRef<NutrientType>(selectedNutrient);

  useEffect(() => {
    selectedNutrientRef.current = selectedNutrient;
  }, [selectedNutrient]);

  // based on the selected nutrient -> setup heatmap layer and update tooltip
  useEffect(() => {
    layersRef.current.forEach((layer) => {
      const { feature } = layer;
      NutritionStateChoroplethOperations.addNutritionTooltip(layer, feature, regionNutrition, selectedNutrient);
    });
  }, [selectedNutrient, regionData, regionNutrition]);

  return (
    <>
      <NutritionAccordion
        setSelectedNutrient={setSelectedNutrient}
        selectedNutrient={selectedNutrient}
        countryName={countryName}
      />
      <GeoJSON
        data={regionData}
        style={(feature) => NutritionStateChoroplethOperations.dynamicStyle(feature, regionNutrition, selectedNutrient)}
        onEachFeature={(feature, layer) => {
          layersRef.current.push(layer);
          NutritionStateChoroplethOperations.addNutritionTooltip(layer, feature, regionNutrition, selectedNutrient);
          NutritionStateChoroplethOperations.addHoverEffect(layer);
        }}
      />
    </>
  );
}
