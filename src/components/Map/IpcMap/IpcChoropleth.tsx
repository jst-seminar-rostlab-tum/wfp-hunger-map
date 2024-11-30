import React from 'react';

import { IpcChoroplethProps } from '@/domain/props/IpcChoroplethProps';

import IpcCountryChoropleth from './IpcCountryChoropleth';
import IpcGlobalChoropleth from './IpcGlobalChoropleth';

function IpcChoropleth({
  ipcData,
  countries,
  selectedCountryId,
  setSelectedCountryId,
  resetAlert,
  countryData,
  ipcRegionData,
}: IpcChoroplethProps) {
  return (
    <div>
      <IpcGlobalChoropleth
        ipcData={ipcData}
        countries={countries}
        setSelectedCountryId={setSelectedCountryId}
        resetAlert={resetAlert}
        selectedCountryId={selectedCountryId}
      />

      {ipcRegionData && <IpcCountryChoropleth regionIpcData={ipcRegionData} countryData={countryData} />}
    </div>
  );
}

export default IpcChoropleth;
