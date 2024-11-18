import { FeatureCollection } from 'geojson';

import { AdditionalCountryData } from '../entities/country/AdditionalCountryData';
import { CountryData } from '../entities/country/CountryData';
import { CountryIso3Data } from '../entities/country/CountryIso3Data';
import { CountryIso3Notes } from '../entities/country/CountryIso3Notes';
import { CountryMimiData } from '../entities/country/CountryMimiData';
import { RegionIpc } from '../entities/region/RegionIpc';

export default interface CountryRepository {
  /**
   * Returns the population, FCS and RCS data and news about a country
   * @param countryId
   */
  getCountryData(countryId: number): Promise<CountryData>;

  /**
   * Returns all the regions of a country and their FCS & RCS data
   * @param countryId
   */
  getRegionData(countryId: number): Promise<AdditionalCountryData>;

  /**
   * Returns nutrition, currency exchange, balance of trade and inflation data about a country
   * @param countryCode
   */
  getCountryIso3Data(countryCode: string): Promise<CountryIso3Data>;

  getCountryIso3Notes(countryCode: string): Promise<CountryIso3Notes>; // probably unused
  getRegionNutritionData(countryId: number): Promise<CountryMimiData>; // probably unused

  /**
   * Returns the IPC data for each region of the country
   * @param countryId
   */
  getRegionIpcData(countryId: number): Promise<RegionIpc>;

  /**
   * Returns the geoJSON data for a country
   * @param countryName
   */
  getCountryGeoJSON(countryName: string): Promise<FeatureCollection>;
}
