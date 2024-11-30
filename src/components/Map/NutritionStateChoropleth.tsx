import { GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { Nutrition } from '@/domain/entities/region/RegionNutritionProperties.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import { LayerWithFeature, NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

import NutritionAccordion from './NutritionAccordion';

export default function NutritionStateChoropleth({
  regionNutrition,
  regionData,
  handleClick = () => {},
  tooltip,
}: NutritionStateChoroplethProps) {
  const layersRef = useRef<LayerWithFeature[]>([]);

  const [selectedNutrient, setSelectedNutrient] = useState<NutrientType>(NutrientType.MINI_SIMPLE);

  const selectedNutrientRef = useRef<NutrientType>(selectedNutrient);

  useEffect(() => {
    selectedNutrientRef.current = selectedNutrient;
  }, [selectedNutrient]);

  // based on the selected nutrient -> setup heatmap layer
  useEffect(() => {
    layersRef.current.forEach((layer) => {
      const { feature } = layer;
      if (feature) {
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
          className: tooltip?.className || 'state-tooltip',
          direction: 'top',
          offset: [0, -10],
          permanent: false,
          sticky: true,
        });
      }
    });
  }, [selectedNutrient]);

  const onEachFeature = (feature: GeoJsonProperties, layer: L.Layer): void => {
    layersRef.current.push(layer);
    NutritionStateChoroplethOperations.addHoverEffect(
      layer,
      feature as GeoJSON.Feature<Geometry, GeoJsonProperties>,
      regionNutrition,
      () => selectedNutrientRef.current
    );
    layer.on('click', () => handleClick(feature));
  };

  return (
    <>
      <NutritionAccordion setSelectedNutrient={setSelectedNutrient} selectedNutrient={selectedNutrient} />
      <GeoJSON
        data={regionData}
        style={(feature) => NutritionStateChoroplethOperations.dynamicStyle(feature, regionNutrition, selectedNutrient)}
        onEachFeature={onEachFeature}
      />
    </>
  );
}
