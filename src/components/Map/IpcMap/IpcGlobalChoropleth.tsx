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
  resetAlert,
}: IpcGlobalChoroplethProps) {
  const map = useMap();
  const ipcColorData = IpcChoroplethOperations.generateColorMap(ipcData, countries) as FeatureCollection<
    Geometry,
    GeoJsonProperties
  >;

  const handleCountryFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    IpcChoroplethOperations.initializeCountryLayer(
      feature,
      layer,
      ipcData,
      setSelectedCountryId,
      setIpcRegionData,
      setCountryData,
      map,
      resetAlert
    );
  };

  return (
    <GeoJSON style={IpcChoroplethOperations.ipcGlobalStyle} data={ipcColorData} onEachFeature={handleCountryFeature} />
  );
}

export default IpcGlobalChoropleth;
