import { createContext, ReactNode, useContext, useMemo } from 'react';

import { useQueryParams } from '@/domain/contexts/QueryParamsContext';

import { GlobalInsight } from '../enums/GlobalInsight';

interface SelectedMapTypeState {
  selectedMapType: GlobalInsight;
  setSelectedMapType: (value: GlobalInsight) => void;
}

const SelectedMapContext = createContext<SelectedMapTypeState | undefined>(undefined);

export function SelectedMapProvider({ children }: { children: ReactNode }) {
  const { queryParams, setQueryParam } = useQueryParams();
  const setSelectedMapType = (value: GlobalInsight) => {
    setQueryParam('mapType', value);
    // send event to Google Analytics
    window.gtag('event', `${value}_map_selected`);
  };

  const value = useMemo(
    () => ({
      selectedMapType: queryParams.mapType ?? GlobalInsight.FOOD,
      setSelectedMapType,
    }),
    [queryParams.mapType]
  );

  return <SelectedMapContext.Provider value={value}>{children}</SelectedMapContext.Provider>;
}

export function useSelectedMap() {
  const context = useContext(SelectedMapContext);
  if (!context) {
    throw new Error('useSelectedMap must be used within a SelectedMapProvider');
  }
  return context;
}
