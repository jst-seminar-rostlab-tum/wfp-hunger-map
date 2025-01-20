import { useQuery } from '@tanstack/react-query';

import { cachedQueryClient } from '@/config/queryClient';
import container from '@/container';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition';

import { GlobalFcsData } from '../entities/country/CountryFcsData';
import { CountryIpcData } from '../entities/country/CountryIpcData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';
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
  useQuery<CountryMapDataWrapper>(
    {
      queryKey: ['fetchMapDataForCountry'],
      queryFn: globalRepo.getMapDataForCountries,
    },
    cachedQueryClient
  );

export const useFcsData = () =>
  useQuery<GlobalFcsData>(
    {
      queryKey: ['fetchFcsData'],
      queryFn: globalRepo.getFcsData,
    },
    cachedQueryClient
  );
