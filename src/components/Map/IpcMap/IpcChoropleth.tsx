import { FeatureCollection, Geometry } from 'geojson';
import React, { useEffect } from 'react';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { CountryProps } from '@/domain/entities/country/CountryMapData';
import { useIpcQuery } from '@/domain/hooks/globalHooks';
import { useSelectedCountryParam } from '@/domain/hooks/queryParamsHooks';
import { IpcChoroplethProps } from '@/domain/props/IpcChoroplethProps';

import IpcAccordion from './IpcAccordion';
import IpcCountryChoropleth from './IpcCountryChoropleth';
import IpcGlobalChoropleth from './IpcGlobalChoropleth';

function IpcChoropleth({ countries, onDataUnavailable }: IpcChoroplethProps) {
  const { data: ipcData } = useIpcQuery(true);
  const { selectedCountryId } = useSelectedCountryId();
  const [selectedCountry, setSelectedCountry] = useSelectedCountryParam();

  useEffect(() => {
    if (selectedCountryId) {
      setSelectedCountry(selectedCountryId); // Update query param
    } else if (!selectedCountryId) {
      setSelectedCountry(undefined); // Clear query param if no country is selected
    }
  }, [selectedCountryId, setSelectedCountry, selectedCountry]);

  return (
    <>
      {/* Render the global IPC choropleth if ipcData is available */}
      {ipcData && <IpcGlobalChoropleth ipcData={ipcData} countries={countries} />}

      {/* Render region IPC choropleth and accordion if country is selected */}
      {selectedCountryId && (
        <>
          <IpcAccordion countryMapData={countries} />

          <IpcCountryChoropleth
            countryMapData={countries as FeatureCollection<Geometry, CountryProps>}
            onDataUnavailable={onDataUnavailable}
          />
        </>
      )}
    </>
  );
}

export default IpcChoropleth;
