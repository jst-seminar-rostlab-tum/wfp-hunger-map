import { useQuery } from '@tanstack/react-query';

import { cachedQueryClient } from '@/config/queryClient';
import container from '@/container';

import { Conflict } from '../entities/alerts/Conflict';
import { Hazard } from '../entities/alerts/Hazard';
import { AlertRepository } from '../repositories/AlertRepository';

const alertsRepo = container.resolve<AlertRepository>('AlertRepository');

export const useConflictQuery = () =>
  useQuery<Conflict[]>(
    {
      queryKey: ['fetchConflicts'],
      queryFn: alertsRepo.getConflictData,
    },
    cachedQueryClient
  );

export const useHazardQuery = () =>
  useQuery<Hazard[]>(
    {
      queryKey: ['fetchHazards'],
      queryFn: alertsRepo.getHazardData,
    },
    cachedQueryClient
  );
