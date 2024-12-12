import { Feature as GeoJsonFeature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { createRoot } from 'react-dom/client';

import CountryHoverPopover from '@/components/CountryHoverPopover/CountryHoverPopover';
import container from '@/container';
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
    setIpcRegionData: (ipcRegionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void
  ) {
    setCountryClickLoading(true);

    const countryRepository = container.resolve<CountryRepository>('CountryRepository');
    try {
      if (selectedMapType === GlobalInsight.FOOD) {
        const newRegionData = await countryRepository.getRegionData(selectedCountryData.properties.adm0_id);
        if (newRegionData && newRegionData.features) {
          setRegionData({
            type: 'FeatureCollection',
            features: newRegionData.features as GeoJsonFeature<Geometry, GeoJsonProperties>[],
          });
        }
      }

      if (selectedMapType === GlobalInsight.IPC) {
        setIpcRegionData(undefined);
        const newIpcRegionData = await countryRepository.getRegionIpcData(selectedCountryData.properties.adm0_id);
        if (newIpcRegionData && newIpcRegionData.features) {
          setIpcRegionData({
            type: 'FeatureCollection',
            features: newIpcRegionData?.features as GeoJsonFeature<Geometry, GeoJsonProperties>[],
          });
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
        if (newRegionNutritionData && newRegionNutritionData.features) {
          setRegionNutritionData({
            type: 'FeatureCollection',
            features: newRegionNutritionData.features as GeoJsonFeature<Geometry, GeoJsonProperties>[],
          });
        }
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
}
