import { Feature as GeoJsonFeature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';

import CountryHoverPopover from '@/components/CountryHoverPopover/CountryHoverPopover';
import { MAP_MAX_ZOOM, REGION_LABEL_SENSITIVITY, SELECTED_COUNTRY_ZOOM_THRESHOLD } from '@/domain/constant/map/Map.ts';
import { CommonRegionProperties } from '@/domain/entities/common/CommonRegionProperties';
import { Feature } from '@/domain/entities/common/Feature';

export class MapOperations {
  static convertCountriesToFeatureCollection = <T, U>(countryFeatures: Feature<T, U>[]): FeatureCollection => ({
    type: 'FeatureCollection',
    features: countryFeatures as GeoJsonFeature<Geometry, GeoJsonProperties>[],
  });

  /**
   * Create a 'HTMLDivElement' rending the given 'countryName' within a 'CountryHoverPopover'.
   * Needed cause leaflet tooltips do not accept React components.
   */
  static createCountryNameTooltipElement(countryName: string): HTMLDivElement {
    const tooltipContainer = document.createElement('div');
    const root = createRoot(tooltipContainer);
    root.render(<CountryHoverPopover header={countryName} />);
    return tooltipContainer;
  }

  static updateRegionLabelTooltip(feature: Feature<CommonRegionProperties>, map: L.Map, tooltip: L.Tooltip) {
    const bounds = L.geoJSON(feature).getBounds();
    const zoom = map.getZoom();
    const width = (bounds.getEast() - bounds.getWest()) * zoom;
    const isMaxZoom = zoom === MAP_MAX_ZOOM;
    const isZoomThreshold = zoom === SELECTED_COUNTRY_ZOOM_THRESHOLD;

    const text = feature.properties?.Name || '';
    const textWidth = text.length * REGION_LABEL_SENSITIVITY;

    const truncatedText = isZoomThreshold || (textWidth > width && !isMaxZoom) ? '...' : text;

    tooltip.setContent(truncatedText);
  }

  static setupRegionLabelTooltip(
    feature: Feature<CommonRegionProperties>,
    regionLabelData: FeatureCollection<Geometry, GeoJsonProperties>,
    countryIso3: string,
    map: L.Map
  ): L.Tooltip | undefined {
    const featureLabelData = regionLabelData.features.find(
      (labelItem) =>
        labelItem.properties?.iso3 === countryIso3 && labelItem.properties?.name === feature.properties?.Name
    );

    if (featureLabelData && featureLabelData.geometry.type === 'Point') {
      const tooltip = L.tooltip({
        permanent: true,
        direction: 'center',
        className: 'text-background dark:text-foreground',
        content: '',
      }).setLatLng([featureLabelData.geometry.coordinates[1], featureLabelData.geometry.coordinates[0]]);
      tooltip.addTo(map);

      const zoomListener = () => this.updateRegionLabelTooltip(feature, map, tooltip);

      this.updateRegionLabelTooltip(feature, map, tooltip);
      map.on('zoom', zoomListener);
      tooltip.on('remove', () => {
        map.off('zoom', zoomListener);
      });
      return tooltip;
    }
    return undefined;
  }
}
