'use client';

import { Suspense, useState } from 'react';

import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import CountrySelectionSkeleton from '@/components/ComparisonPortal/CountrySelectSkeleton';
import { GlobalFcsData } from '@/domain/entities/country/CountryFcsData';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

import CountryComparisonAccordion from './CountryComparisonAccordion';
import CountrySelection from './CountrySelection';

interface CountryComparisonProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
}

export default function CountryComparison({ countryMapData, globalFcsData }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<CountryMapData[] | undefined>(undefined);

  return (
    <div>
      <Suspense fallback={<CountrySelectionSkeleton />}>
        <CountrySelection
          countryMapData={countryMapData}
          globalFcsData={globalFcsData}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
      </Suspense>
      <Suspense fallback={<ComparisonAccordionSkeleton />}>
        <CountryComparisonAccordion selectedCountries={selectedCountries} />
      </Suspense>
    </div>
  );
}
