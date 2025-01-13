import { Feature as GeoJsonFeature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';

import CountryHoverPopover from '@/components/CountryHoverPopover/CountryHoverPopover';
import container from '@/container';
import { MAP_MAX_ZOOM, REGION_LABEL_SENSITIVITY, SELECTED_COUNTRY_ZOOM_THRESHOLD } from '@/domain/constant/map/Map.ts';
import { Feature } from '@/domain/entities/common/Feature';
import { AdditionalCountryData } from '@/domain/entities/country/AdditionalCountryData.ts';
import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData.ts';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import CountryRepository from '@/domain/repositories/CountryRepository.ts';

export class MapOperations {
  /**
   * Fetching all data to be displayed in the map considering user interaction
   * @param selectedMapType Currently selected mode
   * @param selectedCountryData Data of the selected country
   * @param setIsLoadingCountry Updates the loading state
   * @param setRegionData Updates region data
   * @param setCountryData Updates country data
   * @param setCountryIso3Data Updates country ISO3 data
   * @param setRegionNutritionData Updates region nutrition data
   * @param setIpcRegionData Updates IPC region data
   * @param regionLabelData Data for region labels containing names and positioning data
   * @param setRegionLabelData Updates region label data
   * @param setIsDataAvailable Indicates whether data is available or if an error occurred
   */
  static async fetchCountryData(
    selectedMapType: GlobalInsight,
    selectedCountryData: CountryMapData,
    setIsLoadingCountry: (isLoading: boolean) => void,
    setRegionData: (regionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (countryData: CountryData | undefined) => void,
    setCountryIso3Data: (iso3Data: CountryIso3Data | undefined) => void,
    setRegionNutritionData: (regionNutritionData: FeatureCollection | undefined) => void,
    setIpcRegionData: (ipcRegionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    regionLabelData: FeatureCollection<Geometry, GeoJsonProperties> | undefined,
    setRegionLabelData: (newRegionLabelData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setIsDataAvailable: (isDataAvailable: boolean) => void
  ) {
    setIsLoadingCountry(true);

    const countryRepository = container.resolve<CountryRepository>('CountryRepository');
    try {
      if (selectedMapType === GlobalInsight.FOOD) {
        const dataPromises: [
          Promise<AdditionalCountryData>,
          Promise<FeatureCollection<Geometry, GeoJsonProperties>> | Promise<undefined>,
        ] = [
          countryRepository.getRegionData(selectedCountryData.properties.adm0_id),
          !regionLabelData ? countryRepository.getRegionLabelData() : Promise.resolve(undefined),
        ];
        const data: [AdditionalCountryData, FeatureCollection<Geometry, GeoJsonProperties> | undefined] =
          await Promise.all(dataPromises);

        if (Array.isArray(data[0]) && data[0][1] === 404) {
          setIsDataAvailable(false);
        } else if (data[0] && data[0].features) {
          const hasFcs = data[0].features.some((feature) => feature.properties?.fcs !== undefined);
          setIsDataAvailable(hasFcs);
          setRegionData({
            type: 'FeatureCollection',
            features: data[0].features as GeoJsonFeature<Geometry, GeoJsonProperties>[],
          });
        }

        if (!regionLabelData) setRegionLabelData(data[1]);
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

      if (selectedMapType === GlobalInsight.FOOD || selectedMapType === GlobalInsight.IPC) {
        const newCountryIso3Data = await countryRepository.getCountryIso3Data(selectedCountryData.properties.iso3);
        setCountryIso3Data(newCountryIso3Data);
      }

      if (selectedMapType === GlobalInsight.NUTRITION) {
        const dataPromises: [
          Promise<CountryMimiData>,
          Promise<FeatureCollection<Geometry, GeoJsonProperties>> | Promise<undefined>,
        ] = [
          countryRepository.getRegionNutritionData(selectedCountryData.properties.adm0_id),
          !regionLabelData ? countryRepository.getRegionLabelData() : Promise.resolve(undefined),
        ];

        const data: [CountryMimiData, FeatureCollection<Geometry, GeoJsonProperties> | undefined] =
          await Promise.all(dataPromises);

        const hasNutrition = data[0].features.some(
          (feature) =>
            feature.properties?.nutrition &&
            typeof feature.properties.nutrition === 'object' &&
            Object.keys(feature.properties.nutrition).length > 0
        );
        setIsDataAvailable(hasNutrition);
        if (data[0] && data[0].features) {
          setRegionNutritionData({
            type: 'FeatureCollection',
            features: data[0].features as GeoJsonFeature<Geometry, GeoJsonProperties>[],
          });
        }

        if (!regionLabelData) setRegionLabelData(data[1]);
      }
    } catch {
      // Do nothing
    } finally {
      setIsLoadingCountry(false);
    }
  }

  /**
   * Resets states of the map holding data for leaflet layers
   * @param setRegionData Updates region data
   * @param setCountryData Updates country data
   * @param setCountryIso3Data Updates country ISO3 data
   * @param setRegionNutritionData Updates region nutrition data
   * @param setIpcRegionData Updates IPC region data
   */
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
    const textWidth = text.length * REGION_LABEL_SENSITIVITY;

    const truncatedText = isZoomThreshold || (textWidth > width && !isMaxZoom) ? '...' : text;

    tooltip.setContent(truncatedText);
  }

  /**
   * Initial setup of tooltips containing the region labels.
   * @param feature region data in GeoJSON format
   * @param regionLabelData data containing information about the labels of the regions and their positions
   * @param countryMapData country data of the country the region that is being set up belongs to
   * @param map leaflet map that is used for application
   * @param setRegionLabelTooltips updates a list holding all the region label tooltips that are currently in use
   */
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
