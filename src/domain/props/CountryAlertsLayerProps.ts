import { CountryAlertData } from '../entities/country/CountryAlertData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';

export interface CountryAlertsLayerProps {
  countries: CountryMapDataWrapper;
  alerts: CountryAlertData[];
}
