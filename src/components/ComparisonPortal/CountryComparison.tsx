'use client';

import { useState } from 'react';

import { useSelectedCountries } from '@/domain/hooks/queryParamsHooks.ts';
import CountryComparisonProps from '@/domain/props/CountryComparisonProps';

import CountryComparisonAccordion from './CountryComparisonAccordion';
import CountrySelection from './CountrySelection';

/**
 * The `CountryComparison` component is the parent component for the country comparison feature.
 * It contains the state for the selected countries and disabled countries, and updates query parameters accordingly using the `useSelectedCountries` hook.
 * @param {CountryComparisonProps} props Props for the CountryComparison component
 * @param {CountryMapDataWrapper} props.countryMapData Country map data
 * @param {GlobalFcsData} props.globalFcsData National FCS Data of all countries
 * @returns {JSX.Element} The CountryComparison component
 */
export default function CountryComparison({ countryMapData, globalFcsData }: CountryComparisonProps): JSX.Element {
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
