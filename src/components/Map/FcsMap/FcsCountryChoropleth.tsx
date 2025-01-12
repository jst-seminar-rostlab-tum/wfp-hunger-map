import { FeatureCollection } from 'geojson';
import React, { useEffect, useMemo, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import AccordionModalSkeleton from '@/components/Accordions/AccordionModalSkeleton';
import { useRegionDataQuery, useRegionLabelQuery } from '@/domain/hooks/countryHooks';
import FscCountryChoroplethProps from '@/domain/props/FcsCountryChoroplethProps';
import { FcsCountryChoroplethOperations } from '@/operations/map/FcsCountryChoroplethOperations';
import { MapOperations } from '@/operations/map/MapOperations';

import CountryLoadingLayer from '../CountryLoading';

/** FscCountryChoropleth function returns a component that displays the fcs map for a country view
 * @param {FscCountryChoroplethProps} props - The props of the component.
 * @param {CountryMapData} props.countryMapData - The detailed map data of the country.
 * @param {(tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void} props.setRegionLabelTooltips - A function to update the region label tooltips.
 * @param {() => void} [props.onDataUnavailable] - A callback to signal to the parent component that there's no regional FCS data for this country
 * @returns {JSX.Element} - The rendered FscCountryChoropleth component.
 */

export default function FscCountryChoropleth({
  countryMapData,
  setRegionLabelTooltips,
  onDataUnavailable,
}: FscCountryChoroplethProps) {
  const countryData = countryMapData.features[0].properties;

  const map = useMap();
  const { data: regionData, isLoading: regionDataLoading, error } = useRegionDataQuery(countryData.adm0_id);
  const { data: regionLabelData, isLoading: regionLabelDataLoading } = useRegionLabelQuery();
  const hasRendered = useRef(false);
  const dataLoaded = useMemo(() => !!regionData && !!regionLabelData, [regionData, regionLabelData]);

  useEffect(() => {
    if (error || (regionData && !regionData.features.some((feature) => feature.properties?.fcs !== undefined))) {
      onDataUnavailable();
    }
  }, [regionData, error]);

  useEffect(() => {
    if (!hasRendered.current) {
      // Skip the effect on the initial render
      hasRendered.current = true;
      return;
    }

    if (regionLabelData && regionData) {
      const tooltips = regionData.features.map((f) =>
        MapOperations.setupRegionLabelTooltip(f, regionLabelData, countryData.iso3, map)
      );
      setRegionLabelTooltips(tooltips.filter((t): t is L.Tooltip => !!t));
    }
  }, [dataLoaded]);

  return !regionData || !regionLabelData || regionDataLoading || regionLabelDataLoading ? (
    <>
      <CountryLoadingLayer countryMapData={countryMapData} color="hsl(var(--nextui-fcsAnimation))" />
      <AccordionModalSkeleton />
    </>
  ) : (
    <GeoJSON
      data={regionData as FeatureCollection}
      style={FcsCountryChoroplethOperations.styleFunction}
      onEachFeature={(feature, layer) =>
        FcsCountryChoroplethOperations.onEachFeature(feature, layer, regionData as FeatureCollection)
      }
    />
  );
}
