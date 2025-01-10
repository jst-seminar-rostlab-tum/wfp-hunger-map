import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React, { useEffect, useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';

import AccordionModalSkeleton from '@/components/Accordions/AccordionModalSkeleton';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useCountryDataQuery, useCountryIso3DataQuery, useRegionIpcDataQuery } from '@/domain/hooks/countryHooks';
import IpcCountryChoroplethProps from '@/domain/props/IpcCountryChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

import CountryLoadingLayer from '../CountryLoading';
import IpcAccordion from './IpcAccordion';

function IpcCountryChoropleth({ countryMapData, onDataUnavailable }: IpcCountryChoroplethProps) {
  const { selectedCountryId } = useSelectedCountryId();
  const { selectedCountryIso3, selectedCountryName } = useMemo(() => {
    const selectedCountry = countryMapData.features.find((country) => country.properties.adm0_id === selectedCountryId);
    if (!selectedCountry) return {};
    return {
      selectedCountryIso3: selectedCountry.properties.iso3,
      selectedCountryName: selectedCountry.properties.adm0_name,
    };
  }, [countryMapData, selectedCountryId]);

  const { data: countryData } = useCountryDataQuery(selectedCountryId!);
  const { data: regionIpcData, isLoading } = useRegionIpcDataQuery(selectedCountryId!);
  const { data: countryIso3Data } = useCountryIso3DataQuery(selectedCountryIso3!);

  useEffect(() => {
    if (regionIpcData && !regionIpcData.features.some((feature) => feature.properties?.ipcPhase !== undefined)) {
      onDataUnavailable();
    }
  }, [regionIpcData]);

  const handleCountryFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    IpcChoroplethOperations.attachEventsRegion(feature, layer);
  };

  return isLoading || !regionIpcData ? (
    <>
      <CountryLoadingLayer
        countryMapData={
          {
            type: 'FeatureCollection',
            features: countryMapData.features.filter((feature) => feature?.properties?.adm0_id === selectedCountryId),
          } as FeatureCollection<Geometry, GeoJsonProperties>
        }
        color="hsl(var(--nextui-ipcAnimation))"
      />
      <AccordionModalSkeleton />
    </>
  ) : (
    <>
      <IpcAccordion countryData={countryData} countryName={selectedCountryName} countryIso3Data={countryIso3Data} />
      <GeoJSON
        style={IpcChoroplethOperations.ipcCountryStyle}
        data={regionIpcData as FeatureCollection}
        onEachFeature={handleCountryFeature}
      />
    </>
  );
}
export default IpcCountryChoropleth;
