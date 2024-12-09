import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';

import CountryLoadingLayer from '@/components/Map/CountryLoading';
import { useIpcQuery } from '@/domain/hooks/globalHooks';
import { IpcChoroplethProps } from '@/domain/props/IpcChoroplethProps';

import IpcCountryChoropleth from './IpcCountryChoropleth';
import IpcGlobalChoropleth from './IpcGlobalChoropleth';

function IpcChoropleth({
  countries,
  selectedCountryId,
  setSelectedCountryId,
  countryData,
  ipcRegionData,
  selectedCountryName,
}: IpcChoroplethProps) {
  const handleBackClick = () => {
    setSelectedCountryId(null);
  };

  const { data: ipcData } = useIpcQuery(true);

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
      )}

      {ipcRegionData && (
        <IpcCountryChoropleth
          regionIpcData={ipcRegionData}
          countryData={countryData}
          countryName={selectedCountryName}
          handleBackButtonClick={handleBackClick}
        />
      )}
    </>
  );
}

export default IpcChoropleth;
