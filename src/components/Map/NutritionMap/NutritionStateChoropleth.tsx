import { FeatureCollection } from 'geojson';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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

export default function NutritionStateChoropleth({
  setRegionLabelTooltips,
  countryMapData,
  onDataUnavailable,
}: NutritionStateChoroplethProps) {
  const countryData = countryMapData.features[0].properties;
  const layersRef = useRef<LayerWithFeature[]>([]);
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientType>(NutrientType.MINI_SIMPLE);
  const selectedNutrientRef = useRef<NutrientType>(selectedNutrient);
  const map = useMap();
  const { data: nutritionData, isLoading } = useRegionNutritionDataQuery(countryData.adm0_id);
  const { data: regionLabelData } = useRegionLabelQuery();
  const hasRendered = useRef(false);
  const dataLoaded = useMemo(() => !!nutritionData && !!regionLabelData, [nutritionData, regionLabelData]);

  useEffect(() => {
    selectedNutrientRef.current = selectedNutrient;
  }, [selectedNutrient]);

  // based on the selected nutrient -> update tooltip
  useEffect(() => {
    layersRef.current.forEach((layer) => {
      const { feature } = layer;
      NutritionStateChoroplethOperations.addNutritionTooltip(layer, feature, selectedNutrient);
    });
  }, [selectedNutrient, nutritionData]);

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
    if (!hasRendered.current) {
      // Skip the effect on the initial render
      hasRendered.current = true;
      return;
    }
    if (regionLabelData && nutritionData) {
      const tooltips = nutritionData.features.map((f) =>
        MapOperations.setupRegionLabelTooltip(f, regionLabelData, countryData.iso3, map)
      );
      setRegionLabelTooltips(tooltips.filter((t): t is L.Tooltip => !!t));
    }
  }, [dataLoaded]);

  return isLoading || !nutritionData ? (
    <>
      <CountryLoadingLayer countryMapData={countryMapData} color="hsl(var(--nextui-nutritionAnimation))" />
      <AccordionModalSkeleton />
    </>
  ) : (
    <>
      <NutritionAccordion
        setSelectedNutrient={setSelectedNutrient}
        selectedNutrient={selectedNutrient}
        countryName={countryData.adm0_name}
      />
      {nutritionData && (
        <GeoJSON
          data={nutritionData as FeatureCollection}
          style={(feature) => NutritionStateChoroplethOperations.dynamicStyle(feature, selectedNutrient)}
          onEachFeature={(feature, layer) => {
            layersRef.current.push(layer);
            NutritionStateChoroplethOperations.addNutritionTooltip(layer, feature, selectedNutrient);
            NutritionStateChoroplethOperations.addHoverEffect(layer);
          }}
        />
      )}
    </>
  );
}
