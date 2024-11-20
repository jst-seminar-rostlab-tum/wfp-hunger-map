import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { GeoJSON } from 'react-leaflet';

import FscCountryChoroplethProps from '@/domain/props/FcsCountryChoroplethProps';

import FcsAccordion from './FcsAccordion';
import FcsRegionTooltip from './FcsRegionTooltip';

function FscCountryChoropleth({ regionData, countryData, countryIso3Data, loading }: FscCountryChoroplethProps) {
  const fcsFill = (fcs: number | null) => {
    if (fcs === null) return 'none';
    if (fcs <= 0.05) return '#29563A';
    if (fcs <= 0.1) return '#73B358';
    if (fcs <= 0.2) return '#CBCC58';
    if (fcs <= 0.3) return '#d5a137';
    if (fcs <= 0.4) return '#EB5A26';
    return '#D3130C';
  };

  const dynamicStyle: L.StyleFunction<GeoJsonProperties> = (feature) => {
    return {
      fillColor: fcsFill(feature?.properties?.fcs?.score),
      color: '#000',
      weight: 1,
      fillOpacity: 0.6,
    };
  };

  const onEachFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    const hoveredRegionFeature = regionData.features.find(
      (regionFeature) => regionFeature.properties?.Code === feature.properties?.Code
    );
    if (hoveredRegionFeature) {
      const tooltipContainer = document.createElement('div');
      const root = createRoot(tooltipContainer);
      root.render(<FcsRegionTooltip feature={hoveredRegionFeature} />);
      layer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true });
    } else {
      layer.bindTooltip('N/A', { className: 'leaflet-tooltip', sticky: true });
    }

    const pathLayer = layer as L.Path;
    pathLayer.on({
      mouseout: () => {
        pathLayer.setStyle(dynamicStyle(feature));
      },
      click: () => {},
    });
  };

  return (
    <div>
      <FcsAccordion countryData={countryData} countryIso3Data={countryIso3Data} loading={loading} />
      <GeoJSON data={regionData} style={dynamicStyle} onEachFeature={onEachFeature} />
    </div>
  );
}

export default FscCountryChoropleth;
