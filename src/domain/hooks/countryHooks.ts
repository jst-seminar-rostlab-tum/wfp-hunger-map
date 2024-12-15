import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';

import { cachedQueryClient } from '@/config/queryClient';
import container from '@/container';

import { isApiError } from '../entities/ApiError';
import { AdditionalCountryData } from '../entities/country/AdditionalCountryData';
import { CountryData, CountryDataRecord } from '../entities/country/CountryData';
import { CountryIso3Data, CountryIso3DataRecord } from '../entities/country/CountryIso3Data';
import { RegionIpc } from '../entities/region/RegionIpc';
import CountryRepository from '../repositories/CountryRepository';

// TODO: reformat this file (merge similar & remove unused functions)
const countryRepo = container.resolve<CountryRepository>('CountryRepository');

export const useCountryDataQuery = (countryId: number) =>
  useQuery<CountryData, Error>(
    {
      queryKey: ['fetchCountryData', countryId],
      queryFn: async () => countryRepo.getCountryData(countryId),
    },
    cachedQueryClient
  );

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

export const useRegionDataQuery = (countryId: number) =>
  useQuery<AdditionalCountryData, Error>(
    {
      queryKey: ['fetchRegionData', countryId],
      queryFn: async () => countryRepo.getRegionData(countryId),
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
