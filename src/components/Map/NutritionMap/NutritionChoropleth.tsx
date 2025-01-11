import { Feature } from 'geojson';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import { useNutritionQuery } from '@/domain/hooks/globalHooks';
import NutritionChoroplethProps from '@/domain/props/NutritionChoroplethProps';
import { MapOperations } from '@/operations/map/MapOperations';
import NutritionChoroplethOperations from '@/operations/map/NutritionChoroplethOperations';

import AccordionModalSkeleton from '../../Accordions/AccordionModalSkeleton';
import CountryLoadingLayer from '../CountryLoading';
import NutritionAccordion from './NutritionAccordion';
import NutritionStateChoropleth from './NutritionStateChoropleth';

/** NutritionChoropleth renders the Nutrition Map for global view. If the region data is available
 * for the selected country, it renders the NutritionStateChoropleth for the states of the country.
 * @param {NutritionChoroplethProps} props - The props of the component
 * @param {data} props.FeatureCollection - The GeoJSON data of the country
 * @param {countryId} props.string - The id of the country
 * @param {regionNutritionData} props.Feature - The GeoJSON data of the region
 * @param {selectedCountryName} props.string - The name of the selected country
 * @param {regionLabelData} props.FeatureCollection<Geometry, GeoJsonProperties> - The region data which is used to label the region.
 * @param {setRegionLabelTooltips} props.React.Dispatch<React.SetStateAction<boolean>> - Function to set the region label tooltips
 * @param {isLoadingCountry} props.boolean - The loading state of the country
 * @returns {JSX.Element} GeoJSON
 */

export default function NutritionChoropleth({
  data,
  countryId,
  regionNutritionData,
  selectedCountryName,
  regionLabelData,
  setRegionLabelTooltips,
  isLoadingCountry,
}: NutritionChoroplethProps) {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { theme } = useTheme();
  const { data: nutritionData } = useNutritionQuery(true);
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientType>(NutrientType.MINI_SIMPLE);

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
      {countryId === selectedCountryId && (
        <NutritionAccordion
          setSelectedNutrient={setSelectedNutrient}
          selectedNutrient={selectedNutrient}
          countryName={selectedCountryName}
          loading={isLoadingCountry}
        />
      )}
      {
        // if this country ('countryId') is selected and data is loaded ('regionNutritionData') show Choropleth for all states
        regionNutritionData && countryId === selectedCountryId && regionLabelData && (
          <NutritionStateChoropleth
            regionNutrition={regionNutritionData}
            regionLabelData={regionLabelData}
            setRegionLabelTooltips={setRegionLabelTooltips}
            countryMapData={data.features[0] as CountryMapData}
            selectedNutrient={selectedNutrient}
          />
        )
      }
    </div>
  );
}
