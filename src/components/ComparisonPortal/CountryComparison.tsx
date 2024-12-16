'use client';

import { useSelectedCountries } from '@/domain/hooks/queryParamsHooks.ts';
import CountryComparisonProps from '@/domain/props/CountryComparisonProps';

import CountryComparisonAccordion from './CountryComparisonAccordion';
import CountrySelection from './CountrySelection';

export default function CountryComparison({ countryMapData, globalFcsData }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useSelectedCountries(countryMapData);

  return (
    <div>
      <CountrySelection
        countryMapData={countryMapData}
        globalFcsData={globalFcsData}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />
      <CountryComparisonAccordion selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />
    </div>
  );
}
