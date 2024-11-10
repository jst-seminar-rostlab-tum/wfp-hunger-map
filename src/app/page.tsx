import HungerAlertLoader from '@/components/HungerAlert/HungerAlertLoader';
import MapLoader from '@/components/Map/MapLoader';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function Home() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapDataPromise = globalRepo.getMapDataForCountries();
  const disputedAreasPromise = globalRepo.getDisputedAreas();
  const [countryMapData, disputedAreas] = await Promise.all([countryMapDataPromise, disputedAreasPromise]);
  return (
    <>
      <MapLoader countries={countryMapData} disputedAreas={disputedAreas} />
      <HungerAlertLoader countryMapData={countryMapData} />
    </>
  );
}
