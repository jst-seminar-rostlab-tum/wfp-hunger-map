import { useQuery } from '@tanstack/react-query';

import { cachedQueryClient } from '@/config/queryClient';
import container from '@/container';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition';

import { CountryIpcData } from '../entities/country/CountryIpcData';
import { GlobalDataRepository } from '../repositories/GlobalDataRepository';

const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');

export const useIpcQuery = (enabled: boolean) =>
  useQuery<CountryIpcData[]>(
    {
      queryKey: ['fetchIpcData'],
      queryFn: globalRepo.getIpcData,
      enabled,
    },
    cachedQueryClient
  );

export const useCountryCodesQuery = () =>
  useQuery(
    {
      queryKey: ['fetchCountryCodes'],
      queryFn: globalRepo.getCountryCodes,
    },
    cachedQueryClient
  );

export const useNutritionQuery = (enabled: boolean) =>
  useQuery<CountryNutrition>(
    {
      queryKey: ['fetchNutritionData'],
      queryFn: globalRepo.getNutritionData,
      enabled,
    },
    cachedQueryClient
  );

export const useMapDataForCountries = () =>
  useQuery(
    {
      queryKey: ['fetchMapDataForCountry'],
      queryFn: globalRepo.getMapDataForCountries,
    },
    cachedQueryClient
  );
