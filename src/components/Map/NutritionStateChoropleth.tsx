import { Feature } from 'geojson';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import { Nutrition } from '@/domain/entities/region/RegionNutritionProperties.ts';
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

  const addStateTooltip = (layer: LayerWithFeature, feature: Feature | undefined) => {
    if (!feature) return;

    const stateId = feature.id || feature.properties?.id;
    const match = regionNutrition?.features.find((item) => item.id === stateId);
    const nutrientValue = match ? match?.properties?.nutrition[selectedNutrient as keyof Nutrition] : null;

    const formattedNutrientValue = NutritionStateChoroplethOperations.formatNutrientValue(nutrientValue);
    const nutrientLabel = NutritionStateChoroplethOperations.getNutrientLabel(selectedNutrient);
    const tooltipContent = `
        <div class="bg-background text-foreground rounded-md shadow-md max-w-sm z-9999">
          <div class="p-4">
            <h3 class="text-lg text-foreground font-bold">${feature.properties?.Name}</h3>
            <div class="mt-2 text-foreground">
              Risk of inadequate intake of <strong>${nutrientLabel}</strong>: ${formattedNutrientValue}
            </div>
          </div>
        </div>
      `;

    layer.unbindTooltip();
    layer.bindTooltip(tooltipContent, {
      className: 'state-tooltip',
      direction: 'top',
      offset: [0, -10],
      permanent: false,
      sticky: true,
    });
  };

  // based on the selected nutrient -> setup heatmap layer
  useEffect(() => {
    layersRef.current.forEach((layer) => {
      const { feature } = layer;
      addStateTooltip(layer, feature);
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
          addStateTooltip(layer, feature);
        }}
      />
    </>
  );
}
