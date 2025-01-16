import ComparisonPortal from '@/components/ComparisonPortal/CountryComparison';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function Page() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapData = await globalRepo.getMapDataForCountries();
  const globalFcsData = await globalRepo.getFcsData();
  return (
    <>
      <h1>Comparison Portal</h1>
      <ComparisonPortal countryMapData={countryMapData} globalFcsData={globalFcsData} />
    </>
  );
}
