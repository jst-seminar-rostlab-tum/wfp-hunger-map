import { CountryAlertData } from '../entities/country/CountryAlertData';
import { CountryFcsData } from '../entities/country/CountryFcsData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';
import { CountryNutrition } from '../entities/country/CountryNutrition';
import { DisputedAreas } from '../entities/DisputedAreas';
import { GlobalInsight } from '../enums/GlobalInsight';

export interface MapProps {
  countries: CountryMapDataWrapper;
  fcsData: Record<string, CountryFcsData>;
  disputedAreas: DisputedAreas;
  selectedMapType?: GlobalInsight;
  nutritionData: CountryNutrition;
  alertData: CountryAlertData[];
}
