import React from 'react';

import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';
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
    <div>
      {ipcData && (
        <IpcGlobalChoropleth
          ipcData={ipcData as CountryIpcData[]}
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
