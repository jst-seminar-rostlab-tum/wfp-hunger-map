import { CountryAlertData } from '../entities/country/CountryAlertData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';

export interface AlertContainerProps {
  countries: CountryMapDataWrapper;
  alertData: CountryAlertData[];
}
