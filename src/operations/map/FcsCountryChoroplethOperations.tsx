import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import React from 'react';
import { createRoot } from 'react-dom/client';

import FcsRegionTooltip from '@/components/Map/FcsMap/FcsRegionTooltip';

export class FcsCountryChoroplethOperations {
  static fcsFill(fcs?: number): string {
    if (fcs === undefined) return 'hsl(var(--nextui-notAnalyzed))';
    if (fcs <= 0.05) return '#29563A';
    if (fcs <= 0.1) return '#73B358';
    if (fcs <= 0.2) return '#CBCC58';
    if (fcs <= 0.3) return '#d5a137';
    if (fcs <= 0.4) return '#EB5A26';
    return '#D3130C';
  }

  static styleFunction(feature?: Feature<Geometry, GeoJsonProperties>): L.PathOptions {
    return {
      fillColor: FcsCountryChoroplethOperations.fcsFill(feature?.properties?.fcs?.score),
      color: 'hsl(var(--nextui-countryBorders))',
      weight: 1,
      fillOpacity: 1,
    };
  }

  static onEachFeature(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    regionData: FeatureCollection<Geometry, GeoJsonProperties>
  ) {
    const hoveredRegionFeature = regionData.features.find(
      (regionFeature: Feature<Geometry, GeoJsonProperties>) =>
        regionFeature.properties?.Code === feature.properties?.Code
    );
    const pathLayer = layer as L.Path;

    if (hoveredRegionFeature) {
      const tooltipContainer = document.createElement('div');
      const root = createRoot(tooltipContainer);
      root.render(<FcsRegionTooltip feature={hoveredRegionFeature} />);
      pathLayer.unbindTooltip();
      pathLayer.bindTooltip(tooltipContainer, { className: 'leaflet-tooltip', sticky: true }).openTooltip();
    } else {
      pathLayer.unbindTooltip();
      pathLayer.bindTooltip('N/A', { className: 'leaflet-tooltip', sticky: true }).openTooltip();
    }

    // Hover behavior
    layer.on('mouseover', () => {
      if (hoveredRegionFeature) {
        pathLayer.setStyle({
          fillOpacity: 0.6,
        });
      }
    });

    // Mouseout behavior
    layer.on('mouseout', () => {
      pathLayer.setStyle({
        fillOpacity: 1,
      });
    });
  }
}
