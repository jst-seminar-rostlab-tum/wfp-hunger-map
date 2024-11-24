import { GeoJsonProperties, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

import { Nutrition } from '@/domain/entities/region/RegionNutritionProperties';
import { LayerWithFeature, NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';

const formatNutrientValue = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  return `${value.toFixed(1)}%`;
};

const nutritionFill = (value: number | null): string => {
  if (!value) return 'none';
  if (value <= 19) return '#fff3f3';
  if (value <= 39) return '#fcd0ce';
  if (value <= 59) return '#f88884';
  if (value <= 79) return '#f5524c';
  if (value <= 100) return '#f32e27';
  return '#A0A0A0';
};

const nutrientLabels: { [key: string]: string } = {
  fe_ai: 'Iron',
  fol_ai: 'Folate',
  va_ai: 'Vitamin A',
  vb12_ai: 'Vitamin B12',
  zn_ai: 'Zinc',
  mimi_simple: 'Mean Adequacy Ratio',
};

function NutritionStateChoroplethOperations({
  regionNutri,
  regionData,
  selectedNutrient,
  tooltip,
  handleClick = () => {},
}: NutritionStateChoroplethProps & { selectedNutrient: string }) {
  const layersRef = useRef<LayerWithFeature[]>([]);

  useEffect(() => {
    layersRef.current.forEach((layer) => {
      const { feature } = layer;
      if (feature) {
        const stateId = feature.id || feature.properties?.id;
        const match = regionNutri?.features.find((item) => item.id === stateId);
        const nutrientValue = match ? match?.properties?.nutrition[selectedNutrient as keyof Nutrition] : null;
        const formattedNutrientValue = formatNutrientValue(nutrientValue);
        const nutrientLabel = nutrientLabels[selectedNutrient] || 'Unknown Nutrient';
        const tooltipContent = `
        <div class="bg-background text-foreground rounded-md shadow-md max-w-sm z-9999">
          <div class="px-6 pt-8 pb-4">
            <h3 class="text-lg text-foreground font-bold mb-2 mt-4">${feature.properties?.Name}</h3>
            <div class="mt-4 text-foreground">
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
    console.log('answer', typeof match?.properties.nutrition);
    const value = match ? match?.properties?.nutrition[selectedNutrient as keyof Nutrition] : null;

    return {
      fillColor: nutritionFill(value),
      color: '#000',
      weight: 1,
      fillOpacity: 0.6,
    };
  };

  const onEachFeature = (feature: GeoJsonProperties, layer: L.Layer): void => {
    layersRef.current.push(layer);
    layer.on('click', () => handleClick(feature));
  };

  return <GeoJSON data={regionData} style={dynamicStyle} onEachFeature={onEachFeature} />;
}

export default NutritionStateChoroplethOperations;
