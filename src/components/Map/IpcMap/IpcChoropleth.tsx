import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';

import AccordionModalSkeleton from '@/components/Accordions/AccordionModalSkeleton';
import CountryLoadingLayer from '@/components/Map/CountryLoading';
import IpcAccordion from '@/components/Map/IpcMap/IpcAccordion';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useIpcQuery } from '@/domain/hooks/globalHooks';
import { IpcChoroplethProps } from '@/domain/props/IpcChoroplethProps';

import IpcCountryChoropleth from './IpcCountryChoropleth';
import IpcGlobalChoropleth from './IpcGlobalChoropleth';

function IpcChoropleth({
  countries,
  countryData,
  ipcRegionData,
  selectedCountryName,
  isLoadingCountry,
  countryIso3Data,
}: IpcChoroplethProps) {
  const { data: ipcData } = useIpcQuery(true);
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();

  return (
    <>
      {ipcData && (
        <IpcGlobalChoropleth
          ipcData={ipcData}
          countries={countries}
          setSelectedCountryId={setSelectedCountryId}
          selectedCountryId={selectedCountryId}
        />
      )}
      {!ipcRegionData && selectedCountryId && (
        <>
          <CountryLoadingLayer
            data={
              {
                type: 'FeatureCollection',
                features: countries.features.filter((feature) => feature?.properties?.adm0_id === selectedCountryId),
              } as FeatureCollection<Geometry, GeoJsonProperties>
            }
            selectedCountryId={selectedCountryId}
            color="hsl(var(--nextui-ipcAnimation))"
          />
          <AccordionModalSkeleton />
        </>
      )}
      {selectedCountryId && (
        <IpcAccordion
          countryData={countryData}
          countryName={selectedCountryName}
          loading={isLoadingCountry}
          countryIso3Data={countryIso3Data}
        />
      )}
      {ipcRegionData && <IpcCountryChoropleth regionIpcData={ipcRegionData} />}
    </>
  );
}

export default IpcChoropleth;
