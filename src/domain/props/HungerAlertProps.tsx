import { GlobalFcsData } from '../entities/country/CountryFcsData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';

export default interface HungerAlertProps {
  countryFcsData: GlobalFcsData;
  countryMapData: CountryMapDataWrapper;
}
