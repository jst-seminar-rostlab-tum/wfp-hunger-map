import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import { NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

import NutritionAccordion from './NutritionAccordion';

export default function NutritionStateChoropleth({ regionNutrition, countryName }: NutritionStateChoroplethProps) {
  const layersRef = useRef<LayerWithFeature[]>([]);
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientType>(NutrientType.MINI_SIMPLE);
  const selectedNutrientRef = useRef<NutrientType>(selectedNutrient);

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
    <>
      <NutritionAccordion
        setSelectedNutrient={setSelectedNutrient}
        selectedNutrient={selectedNutrient}
        countryName={countryName}
      />
      {regionNutrition && (
        <GeoJSON
          data={regionNutrition}
          style={(feature) => NutritionStateChoroplethOperations.dynamicStyle(feature, selectedNutrient)}
          onEachFeature={(feature, layer) => {
            layersRef.current.push(layer);
            NutritionStateChoroplethOperations.addNutritionTooltip(layer, feature, selectedNutrient);
            NutritionStateChoroplethOperations.addHoverEffect(layer);
          }}
        />
      )}
    </>
  );
}
