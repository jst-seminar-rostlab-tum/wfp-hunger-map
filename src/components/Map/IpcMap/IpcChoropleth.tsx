import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';

import CountryLoadingLayer from '@/components/Map/CountryLoading';
import { IpcChoroplethProps } from '@/domain/props/IpcChoroplethProps';

import IpcCountryChoropleth from './IpcCountryChoropleth';
import IpcGlobalChoropleth from './IpcGlobalChoropleth';

function IpcChoropleth({
  ipcData,
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

  return (
    <div>
      <IpcGlobalChoropleth
        ipcData={ipcData}
        countries={countries}
        setSelectedCountryId={setSelectedCountryId}
        selectedCountryId={selectedCountryId}
      />
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
    </div>
  );
}

export default IpcChoropleth;
