import AccordionModal from '@/components/Accordions/AccordionModal';
import { AlertsMenuWrapper } from '@/components/AlertsMenu/AlertsMenuWrapper';
import Chatbot from '@/components/Chatbot/Chatbot';
import HungerAlertLoader from '@/components/HungerAlert/HungerAlertLoader';
import MapLegendLoader from '@/components/Legend/MapLegendLoader';
import Map from '@/components/Map/Map';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function Home() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapDataPromise = globalRepo.getMapDataForCountries();
  const countryFcsDataPromise = globalRepo.getFcsData();
  const disputedAreasPromise = globalRepo.getDisputedAreas();
  const alertDataPromise = globalRepo.getAlertData();
  console.time('page.tsx');
  const [countryMapData, fcsData, disputedAreas, alertData] = await Promise.all([
    countryMapDataPromise,
    countryFcsDataPromise,
    disputedAreasPromise,
    alertDataPromise,
  ]);
  console.timeEnd('page.tsx');

  return (
    <>
      <Sidebar countryMapData={countryMapData} fcsData={fcsData} />
      <AlertsMenuWrapper />
      <Chatbot />
      <Map countries={countryMapData} fcsData={fcsData} disputedAreas={disputedAreas} alertData={alertData} />
      {/* <MapLoader countries={countryMapData} fcsData={fcsData} disputedAreas={disputedAreas} alertData={alertData} /> */}
      <HungerAlertLoader countryMapData={countryMapData} countryFcsData={fcsData} />
      <MapLegendLoader />
      <AccordionModal />
    </>
  );
}
