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
    setData: (data: boolean) => void
  ) {
    setCountryClickLoading(true);

    const countryRepository = container.resolve<CountryRepository>('CountryRepository');
    try {
      if (selectedMapType === GlobalInsight.FOOD) {
        const newRegionData = await countryRepository.getRegionData(selectedCountryData.properties.adm0_id);
        if (newRegionData && newRegionData.features) {
          setRegionData({
            type: 'FeatureCollection',
            features: newRegionData.features as Feature<Geometry, GeoJsonProperties>[],
          });
          const hasFcs = newRegionData.features.some((feature) => feature.properties?.fcs !== undefined);
          setData(hasFcs);
        }
      }

      if (selectedMapType === GlobalInsight.IPC) {
        try {
          const newIpcRegionData = await countryRepository.getRegionIpcData(selectedCountryData.properties.adm0_id);

          if (newIpcRegionData && newIpcRegionData.features) {
            setIpcRegionData({
              type: 'FeatureCollection',
              features: newIpcRegionData?.features as Feature<Geometry, GeoJsonProperties>[],
            });
            const hasIpc = newIpcRegionData.features.some((feature) => feature.properties?.ipcPhase !== undefined);
            setData(hasIpc);
          }
        } catch {
          setData(false);
        }
      }

      if (selectedMapType === GlobalInsight.FOOD || selectedMapType === GlobalInsight.IPC) {
        const newCountryData = await countryRepository.getCountryData(selectedCountryData.properties.adm0_id);
        setCountryData(newCountryData);
      }

      if (selectedMapType === GlobalInsight.FOOD) {
        const newCountryIso3Data = await countryRepository.getCountryIso3Data(selectedCountryData.properties.iso3);

        if (Array.isArray(newCountryIso3Data) && newCountryIso3Data[1] === 404) {
          setData(false);
        } else {
          setCountryIso3Data(newCountryIso3Data);
          setData(true);
        }
      }

      if (selectedMapType === GlobalInsight.NUTRITION) {
        const newRegionNutritionData = await countryRepository.getRegionNutritionData(
          selectedCountryData.properties.adm0_id
        );
        if (newRegionNutritionData && newRegionNutritionData.features) {
          setRegionNutritionData({
            type: 'FeatureCollection',
            features: newRegionNutritionData.features as Feature<Geometry, GeoJsonProperties>[],
          });
          const hasNutrition = newRegionNutritionData.features.some(
            (feature) =>
              feature.properties?.nutrition &&
              typeof feature.properties.nutrition === 'object' &&
              Object.keys(feature.properties.nutrition).length > 0
          );
          setData(hasNutrition);
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
