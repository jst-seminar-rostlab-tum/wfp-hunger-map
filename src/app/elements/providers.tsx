'use client';

import { ReactNode } from 'react';

import { CountryProvider } from '@/domain/contexts/CountryContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <CountryProvider>{children}</CountryProvider>;
}

export default Providers;
