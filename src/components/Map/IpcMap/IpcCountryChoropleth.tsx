import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { GeoJSON } from 'react-leaflet';

import IpcCountryChoroplethProps from '@/domain/props/IpcCountryChoroplethProps';
import { IpcChoroplethOperations } from '@/operations/map/IpcChoroplethOperations';

function IpcCountryChoropleth({ regionIpcData }: IpcCountryChoroplethProps) {
  /**
   * Handles a country feature by attaching events to the map layer.
   *
   * @param feature - The map feature representing a country.
   * @param layer - The map layer associated with the country feature.
   */
  const handleCountryFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    IpcChoroplethOperations.attachEventsRegion(feature, layer);
  };
  return (
    <GeoJSON
      style={IpcChoroplethOperations.ipcCountryStyle}
      data={regionIpcData}
      onEachFeature={handleCountryFeature}
    />
  );
}

export default IpcCountryChoropleth;
