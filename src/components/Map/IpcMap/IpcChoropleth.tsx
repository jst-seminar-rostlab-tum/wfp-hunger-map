import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React, { useEffect, useState } from 'react';

import { CountryData } from '@/domain/entities/country/CountryData';
import { IpcChoroplethProps } from '@/domain/props/IpcChoroplethProps';

import IpcCountryChoropleth from './IpcCountryChoropleth';
import IpcGlobalChoropleth from './IpcGlobalChoropleth';

function IpcChoropleth({
  ipcData,
  countries,
  selectedCountryId,
  setSelectedCountryId,
  resetAlert,
}: IpcChoroplethProps) {
  const [ipcRegionData, setIpcRegionData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>();
  const [countryData, setCountryData] = useState<CountryData>();

  useEffect(() => {
    if (!selectedCountryId) {
      setIpcRegionData(null);
    }
  }, [selectedCountryId]);

  return (
    <div>
      {!selectedCountryId ? (
        <IpcGlobalChoropleth
          ipcData={ipcData}
          countries={countries}
          setSelectedCountryId={setSelectedCountryId}
          setIpcRegionData={setIpcRegionData}
          setCountryData={setCountryData}
          resetAlert={resetAlert}
        />
      ) : (
        ipcRegionData && <IpcCountryChoropleth regionIpcData={ipcRegionData} countryData={countryData} />
      )}
    </div>
  );
}

export default IpcChoropleth;
