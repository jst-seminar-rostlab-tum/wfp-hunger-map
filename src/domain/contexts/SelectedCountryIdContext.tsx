import { createContext, useContext, useMemo, useState } from 'react';

interface SelectedCountryIdState {
  selectedCountryId: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
}

const SelectedCountryIdContext = createContext<SelectedCountryIdState | undefined>(undefined);

export function SelectedCountryIdProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      selectedCountryId,
      setSelectedCountryId,
    }),
    [selectedCountryId]
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
