import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import container from '@/container';
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
    setIsDataAvailable: (isDataAvailable: boolean) => void
  ) {
    setCountryClickLoading(true);

    const countryRepository = container.resolve<CountryRepository>('CountryRepository');
    try {
      if (selectedMapType === GlobalInsight.IPC) {
        try {
          const newIpcRegionData = await countryRepository.getRegionIpcData(selectedCountryData.properties.adm0_id);
          const hasIpc = newIpcRegionData.features.some((feature) => feature.properties?.ipcPhase !== undefined);
          setIsDataAvailable(hasIpc);
          if (newIpcRegionData && newIpcRegionData.features) {
            setIpcRegionData({
              type: 'FeatureCollection',
              features: newIpcRegionData?.features as Feature<Geometry, GeoJsonProperties>[],
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
        if (Array.isArray(newCountryIso3Data) && newCountryIso3Data[1] === 404) {
          setIsDataAvailable(false);
        } else {
          setCountryIso3Data(newCountryIso3Data);
          setIsDataAvailable(true);
        }
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
            features: newRegionNutritionData.features as Feature<Geometry, GeoJsonProperties>[],
          });
        }
      }
      if (selectedMapType === GlobalInsight.FOOD) {
        const newRegionData = await countryRepository.getRegionData(selectedCountryData.properties.adm0_id);
        const hasFcs = newRegionData.features.some((feature) => feature.properties?.fcs !== undefined);
        setIsDataAvailable(hasFcs);
        if (newRegionData && newRegionData.features) {
          setRegionData({
            type: 'FeatureCollection',
            features: newRegionData.features as Feature<Geometry, GeoJsonProperties>[],
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
}
