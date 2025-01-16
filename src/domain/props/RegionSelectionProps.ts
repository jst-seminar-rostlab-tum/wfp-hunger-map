import { GlobalFcsData } from '../entities/country/CountryFcsData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';

export interface RegionSelectionProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
  selectedRegionComparisonCountry: string | undefined;
  setSelectedRegionComparisonCountry: (country: string | undefined) => void;
  selectedRegions: string[];
  setSelectedRegions: (regions: string[]) => void;
}
