import { AlertsMenuWrapper } from '@/components/AlertsMenu/AlertsMenuWrapper';
import Chatbot from '@/components/Chatbot/Chatbot';
import HungerAlertLoader from '@/components/HungerAlert/HungerAlertLoader';
import MapLoader from '@/components/Map/MapLoader';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function Home() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapDataPromise = globalRepo.getMapDataForCountries();
  const disputedAreasPromise = globalRepo.getDisputedAreas();
  const [countryMapData, disputedAreas] = await Promise.all([countryMapDataPromise, disputedAreasPromise]);
  return (
    <>
      <Chatbot />
      <Sidebar />
      <AlertsMenuWrapper />
      <MapLoader countries={countryMapData} disputedAreas={disputedAreas} />
      <HungerAlertLoader countryMapData={countryMapData} />
    </>
  );
}
