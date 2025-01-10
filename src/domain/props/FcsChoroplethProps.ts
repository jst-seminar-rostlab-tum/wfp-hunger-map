import { FeatureCollection, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryFcsData } from '@/domain/entities/country/CountryFcsData.ts';

import { CountryProps } from '../entities/country/CountryMapData';

export default interface FcsChoroplethProps {
  data: FeatureCollection<Geometry, CountryProps>;
  countryId: number;
  fcsData: Record<string, CountryFcsData>;
  setRegionLabelTooltips: (tooltips: L.Tooltip[]) => void;
  onDataUnavailable: () => void;
}
