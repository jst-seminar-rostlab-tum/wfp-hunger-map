import { GlobalFcsData } from '../entities/country/CountryFcsData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';

export default interface CountryComparisonProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
}
