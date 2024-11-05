import Chatbot from '@/components/Chatbot/Chatbot';
import MapLoader from '@/components/Map/MapLoader';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function Home() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapDataPromise = globalRepo.getMapDataForCountries();
  const disputedAreasPromise = globalRepo.getDisputedAreas();
  const [countryMapData, disputedAreas] = await Promise.all([countryMapDataPromise, disputedAreasPromise]);
  return (
    <div className="relative bg-black h-full w-full">
      <Chatbot />
      <MapLoader countries={countryMapData} disputedAreas={disputedAreas} />
    </div>
  );
}
