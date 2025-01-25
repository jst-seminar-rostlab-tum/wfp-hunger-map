import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import { useNutritionQuery } from '@/domain/hooks/globalHooks';
import { useSelectedCountryParam } from '@/domain/hooks/queryParamsHooks';
import NutritionChoroplethProps from '@/domain/props/NutritionChoroplethProps';
import { MapOperations } from '@/operations/map/MapOperations';
import NutritionChoroplethOperations from '@/operations/map/NutritionChoroplethOperations';

import NutritionAccordion from './NutritionAccordion';
import NutritionStateChoropleth from './NutritionStateChoropleth';

/** NutritionChoropleth renders the Nutrition Map for global view. If the region data is available
 * for the selected country, it renders the NutritionStateChoropleth for the states of the country.
 * @param {NutritionChoroplethProps} props - The props of the component.
 * @param {FeatureCollection} props.data - The GeoJSON data of the country.
 * @param {string} props.countryId - The ID of the country.
 * @param {() => void} [props.onDataUnavailable] - A callback to signal to the parent component that there's no regional Nutrition data for this country
 * @returns {JSX.Element} - The rendered NutritionChoropleth component
 */

export default function NutritionChoropleth({ data, countryId, onDataUnavailable }: NutritionChoroplethProps) {
  const countryData = data.features[0].properties;
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { theme } = useTheme();
  const { data: nutritionData } = useNutritionQuery(true);
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientType>(NutrientType.MINI_SIMPLE);
  const map = useMap();
  const [selectedCountry, setSelectedCountry] = useSelectedCountryParam();

  // adding the country name as a tooltip to each layer (on hover)
  // the tooltip is not shown if the country is selected or there is no data available for the country
  useEffect(() => {
    if (!geoJsonRef.current || !nutritionData || !map) return () => {};
    return MapOperations.handleCountryTooltip(geoJsonRef, map, undefined, nutritionData, data);
  }, [selectedCountryId, nutritionData]);

  useEffect(() => {
    if (countryId === selectedCountryId) {
      setSelectedCountry(selectedCountryId); // Update query param
    } else if (!selectedCountryId) {
      setSelectedCountry(undefined); // Clear query param if no country is selected
    }
  }, [countryId, selectedCountryId, setSelectedCountry, selectedCountry]);

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

      {countryId === selectedCountryId && (
        <>
          <NutritionAccordion
            setSelectedNutrient={setSelectedNutrient}
            selectedNutrient={selectedNutrient}
            countryName={countryData.adm0_name}
          />
          <NutritionStateChoropleth
            onDataUnavailable={onDataUnavailable}
            countryMapData={data}
            selectedNutrient={selectedNutrient}
          />
        </>
      )}
    </div>
  );
}
