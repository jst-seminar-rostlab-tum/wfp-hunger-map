/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import { createContext, ReactNode, useContext } from 'react';

import container from '@/container';
import CountryRepository from '@/domain/repositories/CountryRepository';

import { CountryData } from '../entities/country/CountryData';

interface CountryContextType {
  getCountryData: (countryCode: number) => Promise<CountryData>;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const countryRepository = container.resolve<CountryRepository>('CountryRepository');

  const value = {
    getCountryData: countryRepository.getCountryData.bind(countryRepository),
  };

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}
