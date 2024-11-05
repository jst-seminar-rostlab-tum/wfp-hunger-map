import { QueryClient } from '@tanstack/react-query';

/**
 * Only refetches data if it's more than 1 hour old
 */
export const cachedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 60,
    },
  },
});
