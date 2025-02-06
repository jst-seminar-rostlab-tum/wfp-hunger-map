import AccordionModal from '@/components/Accordions/AccordionModal';
import { AlertsMenuWrapper } from '@/components/AlertsMenu/AlertsMenuWrapper';
import Chatbot from '@/components/Chatbot/Chatbot';
import HungerAlertLoader from '@/components/HungerAlert/HungerAlertLoader';
import MapLegendLoader from '@/components/Legend/MapLegendLoader';
import MapLoader from '@/components/Map/MapLoader';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function Home() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapDataPromise = globalRepo.getMapDataForCountries();
  const countryFcsDataPromise = globalRepo.getFcsData();
  const disputedAreasPromise = globalRepo.getDisputedAreas();
  const alertDataPromise = globalRepo.getAlertData();
  const [countryMapData, fcsData, disputedAreas, alertData] = await Promise.all([
    countryMapDataPromise,
    countryFcsDataPromise,
    disputedAreasPromise,
    alertDataPromise,
  ]);

  return (
    <>
      <Sidebar countryMapData={countryMapData} fcsData={fcsData} />
      <AlertsMenuWrapper />
      <HungerAlertLoader countryMapData={countryMapData} countryFcsData={fcsData} />
      <Chatbot />
      <MapLegendLoader />
      <MapLoader countries={countryMapData} fcsData={fcsData} disputedAreas={disputedAreas} alertData={alertData} />
      <AccordionModal />
    </>
  );
}
