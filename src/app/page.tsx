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
  const disputedAreasPromise = globalRepo.getDisputedAreas();
  const ipcDataPromise = globalRepo.getIpcData();
  const nutritionDataPromise = globalRepo.getNutritionData();
  const [countryMapData, disputedAreas, ipcData, nutritionData] = await Promise.all([
    countryMapDataPromise,
    disputedAreasPromise,
    ipcDataPromise,
    nutritionDataPromise
  ]);

  return (
    <>
      <Sidebar />
      <AlertsMenuWrapper />
      <Chatbot />
      <MapLoader
        countries={countryMapData}
        disputedAreas={disputedAreas}
        ipcData={ipcData}
        nutritionData={nutritionData}
      />
      <HungerAlertLoader countryMapData={countryMapData} />
      <MapLegend />
    </>
  );
}
