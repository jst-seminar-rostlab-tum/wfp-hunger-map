import { GlobalFcsData } from '../entities/country/CountryFcsData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';

export interface RegionSelectionProps {
  countryMapData: CountryMapDataWrapper;
  globalFcsData: GlobalFcsData;
  selectedRegionComparisonCountry: string | null | undefined;
  setSelectedRegionComparisonCountry: (country: string | null) => void;
  selectedRegions: string[] | 'all' | undefined;
  setSelectedRegions: (regions: string[] | 'all', nAvailableRegions?: number) => void;
}
