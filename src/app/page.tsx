import { AlertsMenuWrapper } from '@/components/AlertsMenu/AlertsMenuWrapper';
import Chatbot from '@/components/Chatbot/Chatbot';
import HungerAlertLoader from '@/components/HungerAlert/HungerAlertLoader';
import MapLegend from '@/components/Legend/MapLegend';
import MapLoader from '@/components/Map/MapLoader';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function Home() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapDataPromise = globalRepo.getMapDataForCountries();
  const countryFcsDataPromise = globalRepo.getFcsData();
  const disputedAreasPromise = globalRepo.getDisputedAreas();
  const ipcDataPromise = globalRepo.getIpcData();
  const nutritionDataPromise = globalRepo.getNutritionData();
  const alertDataPromise = globalRepo.getAlertData();
  const [countryMapData, fcsData, disputedAreas, ipcData, nutritionData, alertData] = await Promise.all([
    countryMapDataPromise,
    countryFcsDataPromise,
    disputedAreasPromise,
    ipcDataPromise,
    nutritionDataPromise,
    alertDataPromise,
  ]);

  return (
    <>
      <Sidebar countryMapData={countryMapData} />
      <AlertsMenuWrapper />
      <Chatbot />
      <MapLoader
        countries={countryMapData}
        fcsData={fcsData}
        disputedAreas={disputedAreas}
        ipcData={ipcData}
        nutritionData={nutritionData}
        alertData={alertData}
      />
      <HungerAlertLoader countryMapData={countryMapData} countryFcsData={fcsData} />
      <MapLegend />
    </>
  );
}
