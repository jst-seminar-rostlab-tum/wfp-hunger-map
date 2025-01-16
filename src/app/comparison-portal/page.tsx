import { Suspense } from 'react';

import ComparisonAccordionSkeleton from '@/components/ComparisonPortal/ComparisonAccordionSkeleton';
import ComparisonPortal from '@/components/ComparisonPortal/CountryComparison';
import SelectionSkeleton from '@/components/ComparisonPortal/CountrySelectSkeleton';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function Page() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapData = await globalRepo.getMapDataForCountries();
  const globalFcsData = await globalRepo.getFcsData();
  return (
    <div>
      <h1>Comparison Portal</h1>
      <Suspense
        fallback={
          <>
            <SelectionSkeleton />
            <ComparisonAccordionSkeleton />
          </>
        }
      >
        <ComparisonPortal countryMapData={countryMapData} globalFcsData={globalFcsData} />
      </Suspense>
    </div>
  );
}
