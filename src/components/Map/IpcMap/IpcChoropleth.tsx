import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';

import CountryLoadingLayer from '@/components/Map/CountryLoading';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData.ts';
import { useIpcQuery } from '@/domain/hooks/globalHooks';
import { IpcChoroplethProps } from '@/domain/props/IpcChoroplethProps';

import IpcCountryChoropleth from './IpcCountryChoropleth';
import IpcGlobalChoropleth from './IpcGlobalChoropleth';

function IpcChoropleth({ countries, countryData, ipcRegionData, selectedCountryName }: IpcChoroplethProps) {
  const { data: ipcData } = useIpcQuery(true);
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const handleBackClick = () => {
    setSelectedCountryId(null);
  };

  return (
    <>
      {ipcData && (
        <IpcGlobalChoropleth
          ipcData={ipcData as CountryIpcData[]}
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
