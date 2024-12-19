import { Feature } from 'geojson';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import { useNutritionQuery } from '@/domain/hooks/globalHooks';
import NutritionChoroplethProps from '@/domain/props/NutritionChoroplethProps';
import { MapOperations } from '@/operations/map/MapOperations';
import NutritionChoroplethOperations from '@/operations/map/NutritionChoroplethOperations';

import AccordionModalSkeleton from '../../Accordions/AccordionModalSkeleton';
import CountryLoadingLayer from '../CountryLoading';
import NutritionStateChoropleth from './NutritionStateChoropleth';

export default function NutritionChoropleth({
  data,
  countryId,
  regionNutritionData,
  selectedCountryName,
  regionLabelData,
  setRegionLabelTooltips,
}: NutritionChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { theme } = useTheme();
  const { data: nutritionData } = useNutritionQuery(true);

  // adding the country name as a tooltip to each layer (on hover)
  // the tooltip is not shown if the country is selected or there is no data available for the country
  useEffect(() => {
    if (!geoJsonRef.current || !nutritionData) return;
    geoJsonRef.current.eachLayer((layer: LayerWithFeature) => {
      if (!layer) return;
      const feature = layer.feature as Feature;
      if (NutritionChoroplethOperations.checkIfActive(data.features[0] as CountryMapData, nutritionData)) {
        const tooltipContainer = MapOperations.createCountryNameTooltipElement(feature?.properties?.adm0_name);
        layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true });
      } else {
        layer.unbindTooltip();
      }
    });
  }, [selectedCountryId]);

  return (
    <div>
      {countryId !== selectedCountryId && nutritionData && (
        <GeoJSON
          ref={(instance) => {
            geoJsonRef.current = instance;
          }}
          data={data}
          style={NutritionChoroplethOperations.countryStyle(
            data.features[0] as CountryMapData,
            nutritionData,
            theme === 'dark'
          )}
          onEachFeature={(feature, layer) =>
            NutritionChoroplethOperations.onEachFeature(
              feature as CountryMapData,
              layer,
              setSelectedCountryId,
              nutritionData
            )
          }
        />
      )}
      {/* Animated GeoJSON layer for the selected country */}
      {selectedCountryId && (!regionNutritionData || !regionLabelData) && (
        <>
          <CountryLoadingLayer
            data={data}
            selectedCountryId={selectedCountryId}
            color="hsl(var(--nextui-nutritionAnimation))"
          />
          <AccordionModalSkeleton />
        </>
      )}
      {
        // if this country ('countryId') is selected and data is loaded ('regionNutritionData') show Choropleth for all states
        regionNutritionData && countryId === selectedCountryId && regionLabelData && (
          <NutritionStateChoropleth
            regionNutrition={regionNutritionData}
            countryName={selectedCountryName}
            regionLabelData={regionLabelData}
            setRegionLabelTooltips={setRegionLabelTooltips}
            countryMapData={data.features[0] as CountryMapData}
          />
        )
      }
    </div>
  );
}
