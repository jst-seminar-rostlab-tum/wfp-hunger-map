import CountryComparison from '@/components/ComparisonPortal/CountryComparison';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function ComparisonPortal() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapData = await globalRepo.getMapDataForCountries();
  return (
    <div>
      <h1>Comparison Portal</h1>
      <div>
        <CountryComparison countryMapData={countryMapData} />
      </div>
    </div>
  );
}
