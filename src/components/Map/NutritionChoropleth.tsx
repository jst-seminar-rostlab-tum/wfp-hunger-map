import { Feature } from 'geojson';
import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import NutritionChoroplethProps from '@/domain/props/NutritionChoroplethProps';
import { MapboxMapOperations } from '@/operations/map/MapboxMapOperations';
import NutritionChoroplethOperations from '@/operations/map/NutritionChoroplethOperations';

import NutritionStateChoropleth from './NutritionStateChoropleth';

export default function NutritionChoropleth({
  data,
  countryId,
  selectedCountryId,
  setSelectedCountryId,
  nutritionData,
  regionNutritionData,
  selectedCountryName,
}: NutritionChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  const [countryStyles, setCountryStyles] = useState<{ [key: number]: L.PathOptions }>({});

  // given the `CountryNutrition` data -> parse the data to map country styling
  useEffect(() => {
    const parsedStyles = NutritionChoroplethOperations.getCountryStyles(nutritionData);
    setCountryStyles(parsedStyles);
  }, [nutritionData]);

  // adding the country name as a tooltip to each layer (on hover)
  // the tooltip is not shown if the country is selected or there is no data available for the country
  useEffect(() => {
    if (!geoJsonRef.current) return;
    geoJsonRef.current.eachLayer((layer: LayerWithFeature) => {
      if (!layer) return;
      const feature = layer.feature as Feature;
      if (
        NutritionChoroplethOperations.allowCountryHover(nutritionData, feature.properties?.adm0_id, selectedCountryId)
      ) {
        const tooltipContainer = MapboxMapOperations.createCountryNameTooltipElement(feature?.properties?.adm0_name);
        layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true });
      } else {
        layer.unbindTooltip();
      }
    });
  }, [selectedCountryId]);

  return (
    <div>
      <GeoJSON
        ref={(instance) => {
          geoJsonRef.current = instance;
        }}
        data={data}
        style={(feature) => {
          const featureStyle = countryStyles[feature?.properties?.adm0_id];
          return featureStyle || NutritionChoroplethOperations.countryStyle;
        }}
        onEachFeature={(feature, layer) =>
          NutritionChoroplethOperations.onEachFeature(feature, layer, setSelectedCountryId, countryStyles)
        }
      />
      {
        // if this country ('countryId') is selected and data is loaded ('regionNutritionData') show Choropleth for all states
        regionNutritionData && countryId === selectedCountryId && (
          <NutritionStateChoropleth regionNutrition={regionNutritionData} countryName={selectedCountryName} />
        )
      }
    </div>
  );
}
