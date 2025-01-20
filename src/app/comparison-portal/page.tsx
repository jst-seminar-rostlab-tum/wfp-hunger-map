'use client';

import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import ComparisonPortal from '@/components/ComparisonPortal/CountryComparison';
import SelectionSkeleton from '@/components/ComparisonPortal/CountrySelectSkeleton';
import { useFcsData, useMapDataForCountries } from '@/domain/hooks/globalHooks';

export default function Page() {
  const { data: countryMapData, isLoading: isCountryMapDataLoading } = useMapDataForCountries();
  const { data: globalFcsData, isLoading: isFcsDataLoading } = useFcsData();
  return (
    <>
      <h1>Comparison Portal</h1>
      {isCountryMapDataLoading || isFcsDataLoading ? (
        <>
          <SelectionSkeleton />
          <ComparisonAccordionSkeleton nItems={5} />
        </>
      ) : (
        <ComparisonPortal countryMapData={countryMapData!} globalFcsData={globalFcsData!} />
      )}
    </>
  );
}
