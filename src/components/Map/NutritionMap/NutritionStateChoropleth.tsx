import { FeatureCollection } from 'geojson';
import React, { useEffect, useMemo, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import AccordionModalSkeleton from '@/components/Accordions/AccordionModalSkeleton';
import { LayerWithFeature } from '@/domain/entities/map/LayerWithFeature.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';
import { useRegionLabelQuery, useRegionNutritionDataQuery } from '@/domain/hooks/countryHooks';
import { NutritionStateChoroplethProps } from '@/domain/props/NutritionStateProps';
import { MapOperations } from '@/operations/map/MapOperations';
import NutritionStateChoroplethOperations from '@/operations/map/NutritionStateChoroplethOperations';

import CountryLoadingLayer from '../CountryLoading';
import NutritionAccordion from './NutritionAccordion';

/** NutritionStateChoropleth Component
 * renders the Nutrition Map for country view.
 * @param {NutritionStateChoroplethProps} props - The props of the component.
 * @param {FeatureCollection} props.countryMapData - The GeoJSON data of the region.
 * @param {NutrientType} props.selectedNutrient - The selected nutrient.
 * @param {() => void} [props.onDataUnavailable] - A callback to signal to the parent component that there's no regional Nutrition data for this country

 * @returns {JSX.Element} - The rendered NutritionStateChoropleth component
 */

export default function NutritionStateChoropleth({
  countryMapData,
  onDataUnavailable,
  selectedNutrient,
  setSelectedNutrient,
}: NutritionStateChoroplethProps) {
  const countryData = countryMapData.features[0].properties;
  const layersRef = useRef<LayerWithFeature[]>([]);
  const selectedNutrientRef = useRef<NutrientType>(selectedNutrient);
  const map = useMap();
  const { data: nutritionData, isLoading } = useRegionNutritionDataQuery(countryData.adm0_id);
  const { data: regionLabelData } = useRegionLabelQuery();
  const dataLoaded = useMemo(() => !!nutritionData && !!regionLabelData, [nutritionData, regionLabelData]);

  useEffect(() => {
    selectedNutrientRef.current = selectedNutrient;
  }, [selectedNutrient]);

  useEffect(() => {
    if (
      nutritionData &&
      !nutritionData.features.some(
        (feature) =>
          feature.properties?.nutrition &&
          typeof feature.properties.nutrition === 'object' &&
          Object.keys(feature.properties.nutrition).length > 0
      )
    ) {
      onDataUnavailable();
    }
  }, [nutritionData]);

  useEffect(() => {
    let tooltips: L.Tooltip[] = [];

    if (regionLabelData && nutritionData) {
      tooltips = nutritionData.features
        .map((f) => MapOperations.setupRegionLabelTooltip(f, regionLabelData, countryData.iso3, map))
        .filter((t): t is L.Tooltip => !!t);
    }

    return () => {
      tooltips.forEach((tooltip) => tooltip.removeFrom(map));
    };
  }, [dataLoaded]);

  return isLoading || !nutritionData ? (
    <>
      <CountryLoadingLayer countryMapData={countryMapData} color="hsl(var(--nextui-nutritionAnimation))" />
      <AccordionModalSkeleton />
    </>
  ) : (
    nutritionData && (
      <>
        <NutritionAccordion
          setSelectedNutrient={setSelectedNutrient}
          selectedNutrient={selectedNutrient}
          countryName={countryData.adm0_name}
        />
        <GeoJSON
          data={nutritionData as FeatureCollection}
          style={(feature) => NutritionStateChoroplethOperations.dynamicStyle(feature, selectedNutrient)}
          onEachFeature={(feature, layer) => {
            layersRef.current.push(layer);
            NutritionStateChoroplethOperations.addEvents(layer, feature, selectedNutrient);
          }}
        />
      </>
    )
  );
}
