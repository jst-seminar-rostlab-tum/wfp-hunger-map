import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { useTheme } from 'next-themes';
import React from 'react';
import { GeoJSON } from 'react-leaflet';

import IpcGlobalChoroplethProps from '@/domain/props/IpcGlobalChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

function IpcGlobalChoropleth({
  ipcData,
  countries,
  setSelectedCountryId,
  selectedCountryId,
}: IpcGlobalChoroplethProps) {
  const { theme } = useTheme();

  const ipcColorData = IpcChoroplethOperations.generateColorMap(ipcData, countries) as FeatureCollection<
    Geometry,
    GeoJsonProperties
  >;

  const filteredIpcColorData = {
    ...ipcColorData,
    features: ipcColorData.features.filter((feature) => feature?.properties?.adm0_id !== selectedCountryId),
  };

  const handleCountryFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    IpcChoroplethOperations.initializeCountryLayer(feature, layer, ipcData, setSelectedCountryId);
  };

  return (
    <GeoJSON
      key={selectedCountryId}
      style={(feature) => {
        if (!feature) {
          return {};
        }
        return IpcChoroplethOperations.ipcGlobalStyle(feature, feature?.properties.adm0_id, ipcData, theme === 'dark');
      }}
      data={filteredIpcColorData}
      onEachFeature={handleCountryFeature}
    />
  );
}

export default IpcGlobalChoropleth;
