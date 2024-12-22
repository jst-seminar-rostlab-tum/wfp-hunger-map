'use client';

import { useState } from 'react';

import { useSelectedCountries } from '@/domain/hooks/queryParamsHooks.ts';
import CountryComparisonProps from '@/domain/props/CountryComparisonProps';

import CountryComparisonAccordion from './CountryComparisonAccordion';
import CountrySelection from './CountrySelection';

export default function CountryComparison({ countryMapData, globalFcsData }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useSelectedCountries(countryMapData);
  const [disabledCountryIds, setDisabledCountryIds] = useState<string[]>([]);

  return (
    <div>
      <CountrySelection
        countryMapData={countryMapData}
        globalFcsData={globalFcsData}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        disabledCountryIds={disabledCountryIds}
      />
      <CountryComparisonAccordion
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        setDisabledCountryIds={setDisabledCountryIds}
      />
    </div>
  );
}
