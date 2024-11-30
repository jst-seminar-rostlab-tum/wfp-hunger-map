import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import NutritionChoroplethProps from '@/domain/props/NutritionChoroplethProps';
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
  regionNutritionData,
  regionData,
  selectedCountryName,
}: NutritionChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  const [countryStyles, setCountryStyles] = useState<{ [key: number]: L.PathOptions }>({});

  // given the `CountryNutrition` data -> parse the data to map country styling
  useEffect(() => {
    const parsedStyles = NutritionChoroplethOperations.getCountryStyles(nutritionData);
    setCountryStyles(parsedStyles);
  }, [nutritionData]);
  const handleBackClick = () => {
    setSelectedCountryId(null);
  };

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
          NutritionChoroplethOperations.onEachFeature(
            feature,
            layer,
            selectedAlert,
            setSelectedCountryId,
            countryStyles,
            toggleAlert
          )
        }
      />
      {
        // if this country ('countryId') is selected and data is loaded ('regionData') show Choropleth for all states
        regionData && countryId === selectedCountryId && (
          <NutritionStateChoropleth
            regionData={regionData}
            regionNutrition={regionNutritionData}
            countryName={selectedCountryName}
            handleBackButtonClick={handleBackClick}
          />
        )
      }
    </div>
  );
}
