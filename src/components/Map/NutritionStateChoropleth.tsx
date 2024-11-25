import { GeoJsonProperties, Geometry } from 'geojson';
import L, { PathOptions } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { Nutrition } from '@/domain/entities/region/RegionNutritionProperties.ts';
import { LayerWithFeature, NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

import NutritionAccordion from './NutritionAccordion';
import NutritionStateLegend from './NutritionStateLegend';

function NutritionStateChoropleth({
  regionNutri,
  regionData,
  handleClick = () => {},
  tooltip,
}: NutritionStateChoroplethProps) {
  const [selectedNutrient, setSelectedNutrient] = useState<string>('mimi_simple');
  const [selectedLabel, setSelectedLabel] = useState<string>('Mean Adequacy Ratio');
  const layersRef = useRef<LayerWithFeature[]>([]);

  useEffect(() => {
    layersRef.current.forEach((layer) => {
      const { feature } = layer;
      if (feature) {
        const stateId = feature.id || feature.properties?.id;
        const match = regionNutri?.features.find((item) => item.id === stateId);
        const nutrientValue = match ? match?.properties?.nutrition[selectedNutrient as keyof Nutrition] : null;
        const formattedNutrientValue = NutritionStateChoroplethOperations.formatNutrientValue(nutrientValue);
        const nutrientLabel = NutritionStateChoroplethOperations.nutrientLabels[selectedNutrient] || 'Unknown Nutrient';
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

  const dynamicStyle = (feature: GeoJSON.Feature<Geometry, GeoJsonProperties> | undefined): PathOptions => {
    if (!feature) return {};

    const stateId = feature.id || feature?.properties?.id;
    const match = regionNutri?.features.find((item) => item.id === stateId);
    const value = match ? match?.properties?.nutrition[selectedNutrient as keyof Nutrition] : null;

    return {
      fillColor: NutritionStateChoroplethOperations.nutritionFillColor(value),
      color: '#000',
      weight: 1,
      fillOpacity: 0.6,
    };
  };

  const onEachFeature = (feature: GeoJsonProperties, layer: L.Layer): void => {
    layersRef.current.push(layer);
    layer.on('click', () => handleClick(feature));
  };

  return (
    <>
      <NutritionAccordion
        setSelectedNutrient={setSelectedNutrient}
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
      />
      <GeoJSON data={regionData} style={dynamicStyle} onEachFeature={onEachFeature} />
      <NutritionStateLegend />
    </>
  );
}

export default NutritionStateChoropleth;
