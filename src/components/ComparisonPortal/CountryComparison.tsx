'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import CountryComparisonProps from '@/domain/props/CountryComparisonProps';

import CountryComparisonAccordion from './CountryComparisonAccordion';
import CountrySelection from './CountrySelection';

export default function CountryComparison({ countryMapData, globalFcsData }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<CountryMapData[] | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!selectedCountries) return;
    const countryIds = selectedCountries.map((country) => country.properties.adm0_id);
    const newSearchParam = countryIds.join(',');
    if (newSearchParam !== searchParams.get('countries')) {
      router.push(`${pathname}?countries=${newSearchParam}`);
    }
  }, [selectedCountries]);

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
