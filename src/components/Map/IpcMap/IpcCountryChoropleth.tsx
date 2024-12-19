import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { GeoJSON } from 'react-leaflet';

import IpcCountryChoroplethProps from '@/domain/props/IpcCountryChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

import IpcAccordion from './IpcAccordion';

function IpcCountryChoropleth({ regionIpcData, countryData, countryName, countryIso3Data }: IpcCountryChoroplethProps) {
  const handleCountryFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    IpcChoroplethOperations.attachEventsRegion(feature, layer);
  };
  return (
    <>
      <IpcAccordion countryData={countryData} countryName={countryName} countryIso3Data={countryIso3Data} />
      <GeoJSON
        style={IpcChoroplethOperations.ipcCountryStyle}
        data={regionIpcData}
        onEachFeature={handleCountryFeature}
      />
    </>
  );
}
export default IpcCountryChoropleth;
