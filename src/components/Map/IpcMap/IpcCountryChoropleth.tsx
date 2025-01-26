import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React, { useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';

import AccordionModalSkeleton from '@/components/Accordions/AccordionModalSkeleton';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { useRegionIpcDataQuery } from '@/domain/hooks/countryHooks';
import IpcCountryChoroplethProps from '@/domain/props/IpcCountryChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

import CountryLoadingLayer from '../CountryLoading';
import IpcAccordion from './IpcAccordion';

function IpcCountryChoropleth({ countryMapData, onDataUnavailable }: IpcCountryChoroplethProps) {
  const { selectedCountryId } = useSelectedCountryId();
  const { data: regionIpcData, isLoading } = useRegionIpcDataQuery(selectedCountryId!);

  useEffect(() => {
    if (regionIpcData && !regionIpcData.features.some((feature) => feature.properties?.ipcPhase !== undefined)) {
      onDataUnavailable();
    }
  }, [regionIpcData]);

  return isLoading || !regionIpcData ? (
    <>
      <CountryLoadingLayer
        countryMapData={
          {
            type: 'FeatureCollection',
            features: [countryMapData.features.find((feature) => feature?.properties?.adm0_id === selectedCountryId)],
          } as FeatureCollection<Geometry, GeoJsonProperties>
        }
        color="hsl(var(--nextui-ipcAnimation))"
      />
      <AccordionModalSkeleton />
    </>
  ) : (
    <>
      <IpcAccordion countryMapData={countryMapData as CountryMapDataWrapper} />
      <GeoJSON
        // manually force the component to rerender (because the key changes) when the selected country (and thus, the ipc region data) changes
        key={selectedCountryId}
        style={IpcChoroplethOperations.ipcCountryStyle}
        data={regionIpcData as FeatureCollection}
        onEachFeature={IpcChoroplethOperations.initializeRegionLayer}
      />
    </>
  );
}

export default IpcCountryChoropleth;
