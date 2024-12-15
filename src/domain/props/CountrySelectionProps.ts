import { GlobalFcsData } from '../entities/country/CountryFcsData';
import { CountryMapData, CountryMapDataWrapper } from '../entities/country/CountryMapData';

export interface CountrySelectionProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
  selectedCountries?: CountryMapData[];
  setSelectedCountries: (countries: CountryMapData[]) => void;
}
