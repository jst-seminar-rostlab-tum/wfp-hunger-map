'use client';

import { useState } from 'react';

import { GlobalFcsData } from '@/domain/entities/country/CountryFcsData';
import { CountryMapData, CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';

import CountryComparisonAccordion from './CountryComparisonAccordion';
import CountrySelection from './CountrySelection';

interface CountryComparisonProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
}

export default function CountryComparison({ countryMapData, globalFcsData }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<CountryMapData[]>([]);

  return (
    <div>
      <CountrySelection
        countryMapData={countryMapData}
        globalFcsData={globalFcsData}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />
      {selectedCountries.length > 1 && <CountryComparisonAccordion selectedCountries={selectedCountries} />}
    </div>
  );
}
