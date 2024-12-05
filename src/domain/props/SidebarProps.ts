import { CountryFcsData } from '@/domain/entities/country/CountryFcsData.ts';

import { CountryMapDataWrapper } from '../entities/country/CountryMapData';

export default interface SidebarProps {
  countryMapData: CountryMapDataWrapper;
  fcsData: Record<string, CountryFcsData>;
}
