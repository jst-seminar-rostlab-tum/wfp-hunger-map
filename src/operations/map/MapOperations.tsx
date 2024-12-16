import { Feature as GeoJsonFeature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';

import CountryHoverPopover from '@/components/CountryHoverPopover/CountryHoverPopover';
import container from '@/container';
import {
  MAP_MAX_ZOOM,
  REGION_LABEL_SENSITIVENESS,
  SELECTED_COUNTRY_ZOOM_THRESHOLD,
} from '@/domain/constant/map/Map.ts';
import { Feature } from '@/domain/entities/common/Feature';
import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import CountryRepository from '@/domain/repositories/CountryRepository.ts';

export class MapOperations {
  static async fetchCountryData(
    selectedMapType: GlobalInsight,
    selectedCountryData: CountryMapData,
    setCountryClickLoading: (isLoading: boolean) => void,
    setRegionData: (regionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (countryData: CountryData | undefined) => void,
    setCountryIso3Data: (iso3Data: CountryIso3Data | undefined) => void,
    setRegionNutritionData: (regionNutritionData: FeatureCollection | undefined) => void,
    setIpcRegionData: (ipcRegionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    regionLabelData: FeatureCollection<Geometry, GeoJsonProperties> | undefined,
    setRegionLabelData: (newRegionLabelData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setIsDataAvailable: (isDataAvailable: boolean) => void
  ) {
    setCountryClickLoading(true);

    const countryRepository = container.resolve<CountryRepository>('CountryRepository');
    try {
      if (selectedMapType === GlobalInsight.FOOD) {
        const newRegionData = await countryRepository.getRegionData(selectedCountryData.properties.adm0_id);
        if (Array.isArray(newRegionData) && newRegionData[1] === 404) {
          setIsDataAvailable(false);
        } else if (newRegionData && newRegionData.features) {
          const hasFcs = newRegionData.features.some((feature) => feature.properties?.fcs !== undefined);
          setIsDataAvailable(hasFcs);
          setRegionData({
            type: 'FeatureCollection',
            features: newRegionData.features as GeoJsonFeature<Geometry, GeoJsonProperties>[],
          });
        }
      }

      if (selectedMapType === GlobalInsight.IPC) {
        try {
          const newIpcRegionData = await countryRepository.getRegionIpcData(selectedCountryData.properties.adm0_id);
          const hasIpc = newIpcRegionData.features.some((feature) => feature.properties?.ipcPhase !== undefined);
          setIsDataAvailable(hasIpc);
          if (newIpcRegionData && newIpcRegionData.features) {
            setIpcRegionData({
              type: 'FeatureCollection',
              features: newIpcRegionData?.features as GeoJsonFeature<Geometry, GeoJsonProperties>[],
            });
          }
        } catch {
          setIsDataAvailable(false);
        }
      }

      if (selectedMapType === GlobalInsight.FOOD || selectedMapType === GlobalInsight.IPC) {
        const newCountryData = await countryRepository.getCountryData(selectedCountryData.properties.adm0_id);
        setCountryData(newCountryData);
      }

      if (selectedMapType === GlobalInsight.FOOD) {
        const newCountryIso3Data = await countryRepository.getCountryIso3Data(selectedCountryData.properties.iso3);
        setCountryIso3Data(newCountryIso3Data);
      }

      if (selectedMapType === GlobalInsight.NUTRITION) {
        const newRegionNutritionData = await countryRepository.getRegionNutritionData(
          selectedCountryData.properties.adm0_id
        );
        const hasNutrition = newRegionNutritionData.features.some(
          (feature) =>
            feature.properties?.nutrition &&
            typeof feature.properties.nutrition === 'object' &&
            Object.keys(feature.properties.nutrition).length > 0
        );
        setIsDataAvailable(hasNutrition);
        if (newRegionNutritionData && newRegionNutritionData.features) {
          setRegionNutritionData({
            type: 'FeatureCollection',
            features: newRegionNutritionData.features as GeoJsonFeature<Geometry, GeoJsonProperties>[],
          });
        }
      }

      if ((selectedMapType === GlobalInsight.FOOD || selectedMapType === GlobalInsight.NUTRITION) && !regionLabelData) {
        const newRegionLabelData = await countryRepository.getRegionLabelData();
        setRegionLabelData(newRegionLabelData);
      }

      setCountryClickLoading(false);
    } catch {
      // Do nothing
    }
  }

  static resetSelectedCountryData(
    setRegionData: (regionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (countryData: CountryData | undefined) => void,
    setCountryIso3Data: (iso3Data: CountryIso3Data | undefined) => void,
    setRegionNutritionData: (regionNutritionData: FeatureCollection | undefined) => void,
    setIpcRegionData: (ipcRegionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void
  ): void {
    setCountryData(undefined);
    setRegionData(undefined);
    setCountryIso3Data(undefined);
    setRegionNutritionData(undefined);
    setIpcRegionData(undefined);
  }

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

  static updateRegionLabelTooltip(
    feature: GeoJsonFeature<Geometry, GeoJsonProperties>,
    map: L.Map,
    tooltip: L.Tooltip
  ) {
    const bounds = L.geoJSON(feature).getBounds();
    const zoom = map.getZoom();
    const width = (bounds.getEast() - bounds.getWest()) * zoom;
    const isMaxZoom = zoom === MAP_MAX_ZOOM;
    const isZoomThreshold = zoom === SELECTED_COUNTRY_ZOOM_THRESHOLD;

    const text = feature.properties?.Name || '';
    const textWidth = text.length * REGION_LABEL_SENSITIVENESS;

    const truncatedText = isZoomThreshold || (textWidth > width && !isMaxZoom) ? '...' : text;

    tooltip.setContent(truncatedText);
  }

  static setupRegionLabelTooltip(
    feature: GeoJsonFeature<Geometry, GeoJsonProperties>,
    regionLabelData: FeatureCollection<Geometry, GeoJsonProperties>,
    countryMapData: CountryMapData,
    map: L.Map,
    setRegionLabelTooltips: (tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void
  ) {
    const featureLabelData = regionLabelData.features.find((labelItem) => {
      return (
        labelItem.properties?.iso3 === countryMapData.properties.iso3 &&
        labelItem.properties?.name === feature.properties?.Name
      );
    });

    if (featureLabelData && featureLabelData.geometry.type === 'Point') {
      const tooltip = L.tooltip({
        permanent: true,
        direction: 'center',
        className: 'text-background dark:text-foreground',
        content: '',
      }).setLatLng([featureLabelData.geometry.coordinates[1], featureLabelData.geometry.coordinates[0]]);
      tooltip.addTo(map);
      setRegionLabelTooltips((prevRegionLabelData) => [...prevRegionLabelData, tooltip]);

      const zoomListener = () => this.updateRegionLabelTooltip(feature, map, tooltip);

      this.updateRegionLabelTooltip(feature, map, tooltip);
      map.on('zoom', zoomListener);
      tooltip.on('remove', () => {
        map.off('zoom', zoomListener);
      });
    }
  }
}
