'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { SelectedCountry } from '@/domain/entities/country/SelectedCountry';

interface SelectedCountryContextType {
  selectedCountry: SelectedCountry | null;
  setSelectedCountry: (country: SelectedCountry | null) => void;
}

const SelectedCountryContext = createContext<SelectedCountryContextType | undefined>(undefined);

export function SelectedCountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry | null>(null);

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
