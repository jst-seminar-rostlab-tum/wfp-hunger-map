import { useQuery } from '@tanstack/react-query';

import { cachedQueryClient } from '@/config/queryClient';
import container from '@/container';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition';

import { CountryIpcData } from '../entities/country/CountryIpcData';
import { GlobalDataRepository } from '../repositories/GlobalDataRepository';

const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');

export const useIpcQuery = () =>
  useQuery<CountryIpcData[]>(
    {
      queryKey: ['fetchIpcData'],
      queryFn: globalRepo.getIpcData,
    },
    cachedQueryClient
  );

export const useNutritionQuery = () =>
  useQuery<CountryNutrition>(
    {
      queryKey: ['fetchNutritionData'],
      queryFn: globalRepo.getNutritionData,
    },
    cachedQueryClient
  );
