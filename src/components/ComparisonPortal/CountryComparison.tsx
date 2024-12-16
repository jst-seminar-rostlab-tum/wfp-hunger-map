'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import CountryComparisonProps from '@/domain/props/CountryComparisonProps';

import ComparisonAccordionSkeleton from './ComparisonAccordionSkeleton';
import CountryComparisonAccordion from './CountryComparisonAccordion';
import CountrySelection from './CountrySelection';
import CountrySelectionSkeleton from './CountrySelectSkeleton';

export default function CountryComparison({ countryMapData, globalFcsData }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<CountryMapData[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const countryIds = selectedCountries.map((country) => country.properties.adm0_id);
    const newSearchParam = countryIds.join(',');
    if (newSearchParam !== searchParams.get('countries')) {
      router.push(`${pathname}?countries=${newSearchParam}`);
    }
  }, [selectedCountries]);

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
        <CountryComparisonAccordion selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />
      </Suspense>
    </div>
  );
}
