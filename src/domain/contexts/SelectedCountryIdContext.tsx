import { createContext, useContext, useMemo } from 'react';

import { useQueryParams } from '@/domain/contexts/QueryParamsContext';

interface SelectedCountryIdState {
  selectedCountryId: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
}

const SelectedCountryIdContext = createContext<SelectedCountryIdState | undefined>(undefined);

export function SelectedCountryIdProvider({ children }: { children: React.ReactNode }) {
  const { queryParams, setQueryParam } = useQueryParams();
  const value = useMemo(
    () => ({
      selectedCountryId: queryParams.countryId ?? null,
      setSelectedCountryId: (newId: number | null) => setQueryParam('countryId', newId),
    }),
    [queryParams]
  );

  return <SelectedCountryIdContext.Provider value={value}>{children}</SelectedCountryIdContext.Provider>;
}

export function useSelectedCountryId() {
  const context = useContext(SelectedCountryIdContext);
  if (!context) {
    throw new Error('useSelectedCountryId must be used within a SelectedCountryIdProvider');
  }
  return context;
}
