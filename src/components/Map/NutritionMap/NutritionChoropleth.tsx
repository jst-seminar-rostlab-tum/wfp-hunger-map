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

import NutritionAccordion from './NutritionAccordion';
import NutritionStateChoropleth from './NutritionStateChoropleth';

/** NutritionChoropleth renders the Nutrition Map for global view. If the region data is available
 * for the selected country, it renders the NutritionStateChoropleth for the states of the country.
 * @param {NutritionChoroplethProps} props - The props of the component.
 * @param {FeatureCollection} props.data - The GeoJSON data of the country.
 * @param {string} props.countryId - The ID of the country.
 * @param {(tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void} props.setRegionLabelTooltips - Function to set the region label tooltips.
 * @param {() => void} [props.onDataUnavailable] - A callback to signal to the parent component that there's no regional Nutrition data for this country
 * @returns {JSX.Element} - The rendered NutritionChoropleth component
 */

export default function NutritionChoropleth({
  data,
  countryId,
  setRegionLabelTooltips,
  onDataUnavailable,
}: NutritionChoroplethProps) {
  const countryData = data.features[0].properties;
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

      {countryId === selectedCountryId && (
        <>
          <NutritionAccordion
            setSelectedNutrient={setSelectedNutrient}
            selectedNutrient={selectedNutrient}
            countryName={countryData.adm0_name}
          />
          <NutritionStateChoropleth
            onDataUnavailable={onDataUnavailable}
            setRegionLabelTooltips={setRegionLabelTooltips}
            countryMapData={data}
            selectedNutrient={selectedNutrient}
          />
        </>
      )}
    </div>
  );
}
