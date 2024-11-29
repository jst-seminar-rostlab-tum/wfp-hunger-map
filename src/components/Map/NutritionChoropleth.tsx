import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { CountryMimiData } from '@/domain/entities/country/CountryMimiData';
import NutritionChoroplethProps from '@/domain/props/NutritionChoroplethProps';
import { MapOperations } from '@/operations/map/MapOperations';
import NutritionChoroplethOperations from '@/operations/map/NutritionChoroplethOperations';

import NutritionStateChoropleth from './NutritionStateChoropleth';

export default function NutritionChoropleth({
  data,
  countryId,
  selectedCountryId,
  selectedAlert,
  setSelectedCountryId,
  toggleAlert,
  nutritionData,
}: NutritionChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const map = useMap();

  const [regionData, setRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>();
  const [regionNutritionData, setRegionNutritionData] = useState<CountryMimiData | undefined>();
  const [countryStyles, setCountryStyles] = useState<{ [key: number]: L.PathOptions }>({});

  // given the `CountryNutrition` data -> parse the data to map country styling
  useEffect(() => {
    const parsedStyles = NutritionChoroplethOperations.getCountryStyles(nutritionData);
    setCountryStyles(parsedStyles);
  }, [nutritionData]);

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
        onEachFeature={(feature, layer) => {
          if (NutritionChoroplethOperations.allowCountryHover(nutritionData, feature?.properties?.adm0_id)) {
            // tooltip on country hover -> showing name
            const tooltipContainer = MapOperations.creatCountryNameTooltipElement(feature?.properties?.adm0_name);
            layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true });
          }

          NutritionChoroplethOperations.onEachFeature(
            feature,
            layer,
            map,
            selectedAlert,
            setSelectedCountryId,
            setRegionData,
            setRegionNutritionData,
            countryStyles,
            toggleAlert
          );
        }}
      />
      {
        // if this country ('countryId') is selected and data is loaded ('regionData') show Choropleth for all states
        regionData && countryId === selectedCountryId && (
          <NutritionStateChoropleth regionData={regionData} regionNutrition={regionNutritionData} />
        )
      }
    </div>
  );
}
