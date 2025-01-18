import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';
import { FeatureCollection } from 'geojson';

import { cachedQueryClient } from '@/config/queryClient';
import container from '@/container';

import { useUserRole } from '../contexts/UserRoleContext';
import { isApiError } from '../entities/ApiError';
import { AdditionalCountryData } from '../entities/country/AdditionalCountryData';
import { CountryData, CountryDataRecord } from '../entities/country/CountryData';
import { CountryForecastData } from '../entities/country/CountryForecastData';
import { CountryIso3Data, CountryIso3DataRecord } from '../entities/country/CountryIso3Data';
import { CountryMimiData } from '../entities/country/CountryMimiData';
import { RegionIpc } from '../entities/region/RegionIpc';
import CountryRepository from '../repositories/CountryRepository';

const countryRepo = container.resolve<CountryRepository>('CountryRepository');

export const useCountryDataQuery = (countryId: number) =>
  useQuery<CountryData, Error>(
    {
      queryKey: ['fetchCountryData', countryId],
      queryFn: async () => countryRepo.getCountryData(countryId),
    },
    cachedQueryClient
  );

export const useCountryForecastDataQuery = (countryId: number) => {
  const { isAdmin } = useUserRole();
  return useQuery<CountryForecastData, Error>(
    {
      queryKey: ['fetchCountryForecastData', countryId],
      queryFn: async () => countryRepo.getCountryForecastData(countryId),
      enabled: isAdmin && process.env.NEXT_PUBLIC_FORECASTS_ENABLED === 'true',
    },
    cachedQueryClient
  );
};

/**
 * Fetches country data for a list of country IDs.
 * If the data is not found for a country, the `onCountryDataNotFound` callback is called with the country ID.
 * @param countryIds List of country IDs to fetch data for.
 * @param onCountryDataNotFound Callback called when the data is not found for a country.
 * @returns An array of query results for each country ID. The query result is `null` if the data is not found.
 */
export const useCountryDataListQuery = (
  countryIds: number[] | undefined,
  onCountryDataNotFound: (countryId: number) => void
) =>
  useQueries<number[], UseQueryResult<CountryDataRecord | null>[]>(
    {
      queries: (countryIds ?? []).map((countryId) => ({
        queryKey: ['fetchCountryData', countryId],
        queryFn: async () => {
          const countryData = await countryRepo.getCountryData(countryId);
          if (isApiError(countryData)) {
            onCountryDataNotFound(countryId);
            return null;
          }
          return { ...countryData, id: countryId };
        },
      })),
    },
    cachedQueryClient
  );

/**
 * Query that fetches data on country regions, such as their coordinates, current FCS and rCSI values and historic FCS trends.
 * @param {number} countryId `adm0_id` of the country to run the query for.
 * @returns `{data: AdditionalCountryData, isLoading: boolean, error: Error | null}`
 */
export const useRegionDataQuery = (countryId: number) =>
  useQuery<AdditionalCountryData, Error>(
    {
      queryKey: ['fetchRegionData', countryId],
      queryFn: async () => {
        const res = await countryRepo.getRegionData(countryId);
        if (Array.isArray(res) && res[1] === 404) {
          throw new Error('Region data not found');
        }
        return res as AdditionalCountryData;
      },
      retry: false,
      enabled: !Number.isNaN(countryId),
    },
    cachedQueryClient
  );

export const useRegionNutritionDataQuery = (countryId: number, enabled = true) =>
  useQuery<CountryMimiData, Error>(
    {
      queryKey: ['fetchRegionNutritionData', countryId],
      queryFn: async () => countryRepo.getRegionNutritionData(countryId),
      enabled: enabled && countryId > 0,
    },
    cachedQueryClient
  );

export const useCountryIso3DataQuery = (countryCode: string) =>
  useQuery<CountryIso3Data, Error>(
    {
      queryKey: ['fetchCountryIso3Data', countryCode],
      queryFn: async () => countryRepo.getCountryIso3Data(countryCode),
    },
    cachedQueryClient
  );

/**
 * Fetches country ISO3 data for a list of country codes.
 * If the data is not found for a country, the `onCountryDataNotFound` callback is called with the country code.
 * @param countryCodes List of country codes to fetch data for.
 * @param onCountryDataNotFound Callback called when the data is not found for a country.
 * @returns An array of query results for each country code. The query result is `null` if the data is not found.
 */
export const useCountryIso3DataListQuery = (
  countryCodes: string[] | undefined,
  onCountryDataNotFound: (countryCode: string) => void
) =>
  useQueries<string[], UseQueryResult<CountryIso3DataRecord | null>[]>(
    {
      queries: (countryCodes ?? []).map((countryCode) => ({
        queryKey: ['fetchCountryIso3Data', countryCode],
        queryFn: async () => {
          const countryIso3Data = await countryRepo.getCountryIso3Data(countryCode);
          if (isApiError(countryIso3Data)) {
            onCountryDataNotFound(countryCode);
            return null;
          }
          return { ...countryIso3Data, id: countryCode };
        },
      })),
    },
    cachedQueryClient
  );

export const useRegionIpcDataQuery = (countryId: number) =>
  useQuery<RegionIpc, Error>(
    {
      queryKey: ['fetchRegionIpcData', countryId],
      queryFn: async () => countryRepo.getRegionIpcData(countryId),
    },
    cachedQueryClient
  );

export const useRegionLabelQuery = () =>
  useQuery<FeatureCollection>(
    {
      queryKey: ['fetchRegionLabelData'],
      queryFn: countryRepo.getRegionLabelData,
    },
    cachedQueryClient
  );
