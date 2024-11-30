import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

import IpcGlobalChoroplethProps from '@/domain/props/IpcGlobalChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

function IpcGlobalChoropleth({
  ipcData,
  countries,
  setSelectedCountryId,
  setIpcRegionData,
  setCountryData,
  setCountryName,
  resetAlert,
  selectedCountryId,
}: IpcGlobalChoroplethProps) {
  const map = useMap();
  const ipcColorData = IpcChoroplethOperations.generateColorMap(ipcData, countries) as FeatureCollection<
    Geometry,
    GeoJsonProperties
  >;

  const filteredIpcColorData = {
    ...ipcColorData,
    features: ipcColorData.features.filter((feature) => feature?.properties?.adm0_id !== selectedCountryId),
  };

  const handleCountryFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    IpcChoroplethOperations.initializeCountryLayer(
      feature,
      layer,
      ipcData,
      setSelectedCountryId,
      setIpcRegionData,
      setCountryData,
      setCountryName,
      map,
      resetAlert
    );
  };

  return (
    <GeoJSON
      key={selectedCountryId}
      style={IpcChoroplethOperations.ipcGlobalStyle}
      data={filteredIpcColorData}
      onEachFeature={handleCountryFeature}
    />
  );
}

export default IpcGlobalChoropleth;
