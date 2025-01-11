import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { useTheme } from 'next-themes';
import React from 'react';
import { GeoJSON } from 'react-leaflet';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import IpcGlobalChoroplethProps from '@/domain/props/IpcGlobalChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

function IpcGlobalChoropleth({ ipcData, countries }: IpcGlobalChoroplethProps) {
  const { theme } = useTheme();
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();

  const ipcColorData = IpcChoroplethOperations.generateColorMap(ipcData, countries) as FeatureCollection<
    Geometry,
    GeoJsonProperties
  >;

  const handleCountryFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    IpcChoroplethOperations.initializeCountryLayer(feature, layer, ipcData, setSelectedCountryId, selectedCountryId!);
  };

  return (
    <GeoJSON
      key={selectedCountryId}
      style={(feature) => {
        if (!feature) {
          return {};
        }

        if (feature.properties.adm0_id === selectedCountryId) {
          return {
            color: 'hsl(var(--nextui-countryBorders))',
            weight: 1,
            fillOpacity: 1,
            fillColor: IpcChoroplethOperations.fillCountryIpc(feature?.properties?.ipcPhase),
          };
        }
        return IpcChoroplethOperations.ipcGlobalStyle(feature, feature?.properties.adm0_id, ipcData, theme === 'dark');
      }}
      data={ipcColorData}
      onEachFeature={handleCountryFeature}
    />
  );
}

export default IpcGlobalChoropleth;
