import { Suspense } from 'react';

import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import CountryComparison from '@/components/ComparisonPortal/CountryComparison';
import CountrySelectionSkeleton from '@/components/ComparisonPortal/CountrySelectSkeleton';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function ComparisonPortal() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapData = await globalRepo.getMapDataForCountries();
  const globalFcsData = await globalRepo.getFcsData();
  return (
    <div>
      <h1>Comparison Portal</h1>
      <Suspense
        fallback={
          <>
            <CountrySelectionSkeleton />
            <ComparisonAccordionSkeleton />
          </>
        }
      >
        <CountryComparison countryMapData={countryMapData} globalFcsData={globalFcsData} />
      </Suspense>
    </div>
  );
}
