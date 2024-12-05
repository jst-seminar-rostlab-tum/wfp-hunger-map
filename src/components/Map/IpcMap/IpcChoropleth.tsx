import React from 'react';

import { useIpcQuery } from '@/domain/hooks/globalHooks.ts';
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
  const ipcData = useIpcQuery().data;

  const handleBackClick = () => {
    setSelectedCountryId(null);
  };

  return (
    <div>
      {ipcData && (
        <IpcGlobalChoropleth
          ipcData={ipcData}
          countries={countries}
          setSelectedCountryId={setSelectedCountryId}
          selectedCountryId={selectedCountryId}
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
