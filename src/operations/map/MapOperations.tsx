import { Feature as GeoJsonFeature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';

import CountryHoverPopover from '@/components/CountryHoverPopover/CountryHoverPopover';
import { MAP_MAX_ZOOM, REGION_LABEL_SENSITIVITY, SELECTED_COUNTRY_ZOOM_THRESHOLD } from '@/domain/constant/map/Map.ts';
import { CommonRegionProperties } from '@/domain/entities/common/CommonRegionProperties';
import { Feature } from '@/domain/entities/common/Feature';

export class MapOperations {
  /**
   * Converts a list of country features into a GeoJSON FeatureCollection.
   * @param countryFeatures list of country features to be converted
   */
  static convertCountriesToFeatureCollection = <T, U>(countryFeatures: Feature<T, U>[]): FeatureCollection => ({
    type: 'FeatureCollection',
    features: countryFeatures as GeoJsonFeature<Geometry, GeoJsonProperties>[],
  });

  /**
   * Creates a 'HTMLDivElement' rendering the given 'countryName' within a 'CountryHoverPopover'.
   * Needed because leaflet tooltips do not accept React components.
   * @param countryName The name to be displayed in the popover
   */
  static createCountryNameTooltipElement(countryName: string): HTMLDivElement {
    const tooltipContainer = document.createElement('div');
    const root = createRoot(tooltipContainer);
    root.render(<CountryHoverPopover header={countryName} />);
    return tooltipContainer;
  }

  /**
   * Updates the region labels for example when the user is zooming. Recalculates if the full label or "..." should be displayed.
   * @param feature region data in GeoJSON format
   * @param map leaflet map that is used for application
   * @param tooltip tooltip element to be updated
   */
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

  /**
   * Initial setup of tooltips containing the region labels.
   * @param feature region data in GeoJSON format
   * @param regionLabelData data containing information about the labels of the regions and their positions
   * @param countryIso3 iso3 code for matching the regions with the country
   * @param map leaflet map that is used for application
   * @return the created tooltip object or undefined
   */
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
