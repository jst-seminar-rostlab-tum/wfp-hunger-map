'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';

interface SelectedCountryContextType {
  selectedCountry: CountryMapData | null;
  setSelectedCountry: (country: CountryMapData | null) => void;
}

const SelectedCountryContext = createContext<SelectedCountryContextType | undefined>(undefined);

export function SelectedCountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<CountryMapData | null>(null);

  const value = useMemo(() => ({ selectedCountry, setSelectedCountry }), [selectedCountry, setSelectedCountry]);

  return <SelectedCountryContext.Provider value={value}>{children}</SelectedCountryContext.Provider>;
}

export function useSelectedCountry() {
  const context = useContext(SelectedCountryContext);
  if (context === undefined) {
    throw new Error('useSelectedCountry must be used within a SelectedCountryProvider');
  }
  return context;
}
