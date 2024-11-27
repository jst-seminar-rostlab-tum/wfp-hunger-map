import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData.ts';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData.ts';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';
import { DisputedAreas } from '@/domain/entities/DisputedAreas.ts';

export default interface VectorTileLayerProps {
  countries: CountryMapDataWrapper;
  ipcData: CountryIpcData[];
  disputedAreas?: DisputedAreas;
  nutritionData: CountryNutrition;
  setCountryData: (countryData: CountryData) => void;
  setCountryIso3Data: (countryIso3Data: CountryIso3Data) => void;
  setRegionData: (regionData: FeatureCollection<Geometry, GeoJsonProperties>) => void;
  setRegionNutritionData: (regionNutritionData: CountryMimiData | undefined) => void;
}
