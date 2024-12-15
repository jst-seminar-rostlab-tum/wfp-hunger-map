'use client';

import { Suspense, useState } from 'react';

import { GlobalFcsData } from '@/domain/entities/country/CountryFcsData';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

import ComparisonAccordionSkeleton from './ComparisonAccordionSkeleton';
import CountryComparisonAccordion from './CountryComparisonAccordion';
import CountrySelection from './CountrySelection';
import CountrySelectionSkeleton from './CountrySelectSkeleton';

interface CountryComparisonProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
}

export default function CountryComparison({ countryMapData, globalFcsData }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<CountryMapData[]>([]);

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
