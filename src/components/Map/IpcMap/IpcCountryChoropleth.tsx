import React from 'react';
import { GeoJSON } from 'react-leaflet';

import IpcCountryChoroplethProps from '@/domain/props/IpcCountryChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

import IpcAccordion from './IpcAccordion';

function IpcCountryChoropleth({ regionIpcData, countryData, countryName }: IpcCountryChoroplethProps) {
  return (
    <>
      <IpcAccordion countryData={countryData} countryName={countryName} />
      <GeoJSON style={IpcChoroplethOperations.ipcCountryStyle} data={regionIpcData} />
    </>
  );
}

export default IpcCountryChoropleth;
