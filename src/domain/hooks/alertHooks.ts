import { useQuery } from '@tanstack/react-query';

import { cachedQueryClient } from '@/config/queryClient';
import container from '@/container';

import { Conflict } from '../entities/alerts/Conflict';
import { Hazard } from '../entities/alerts/Hazard';
import { AlertRepository } from '../repositories/AlertRepository';

const alertsRepo = container.resolve<AlertRepository>('AlertRepository');

export const useConflictQuery = (enabled: boolean) =>
  useQuery<Conflict[]>(
    {
      queryKey: ['fetchConflicts'],
      queryFn: alertsRepo.getConflictData,
      enabled,
    },
    cachedQueryClient
  );

export const useHazardQuery = (enabled: boolean) =>
  useQuery<Hazard[]>(
    {
      queryKey: ['fetchHazards'],
      queryFn: alertsRepo.getHazardData,
      enabled,
    },
    cachedQueryClient
  );
