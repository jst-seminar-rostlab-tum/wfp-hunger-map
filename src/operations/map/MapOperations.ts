import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import container from '@/container';
import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData.ts';
import CountryRepository from '@/domain/repositories/CountryRepository.ts';

export class MapOperations {
  static async fetchCountryData(
    selectedCountryData: CountryMapData,
    setCountryClickLoading: (isLoading: boolean) => void,
    setRegionData: (regionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void,
    setCountryData: (countryData: CountryData | undefined) => void,
    setCountryIso3Data: (iso3Data: CountryIso3Data | undefined) => void,
    setRegionNutritionData: (regionNutritionData: CountryMimiData | undefined) => void,
    setIpcRegionData: (ipcRegionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined) => void
  ) {
    setCountryClickLoading(true);
    const countryRepository = container.resolve<CountryRepository>('CountryRepository');
    try {
      const newRegionData = await countryRepository.getRegionData(selectedCountryData.properties.adm0_id);
      if (newRegionData && newRegionData.features) {
        setRegionData({
          type: 'FeatureCollection',
          features: newRegionData.features as Feature<Geometry, GeoJsonProperties>[],
        });
      }
      const newCountryData = await countryRepository.getCountryData(selectedCountryData.properties.adm0_id);
      setCountryData(newCountryData);
      const newCountryIso3Data = await countryRepository.getCountryIso3Data(selectedCountryData.properties.iso3);
      setCountryIso3Data(newCountryIso3Data);

      const newRegionNutritionData = await countryRepository.getRegionNutritionData(
        selectedCountryData.properties.adm0_id
      );
      setRegionNutritionData(newRegionNutritionData);

      setIpcRegionData(undefined);
      const newIpcRegionData = await countryRepository.getRegionIpcData(selectedCountryData.properties.adm0_id);
      setIpcRegionData({
        type: 'FeatureCollection',
        features: newIpcRegionData?.features as Feature<Geometry, GeoJsonProperties>[],
      });

      setCountryClickLoading(false);
    } catch {
      // Do nothing
    }
  }
}
