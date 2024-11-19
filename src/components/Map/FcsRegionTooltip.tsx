import { Feature, GeoJsonProperties, Geometry } from 'geojson';

import { formatToMillion } from '@/utils/formatting';

interface FcsRegionTooltipProps {
  feature: Feature<Geometry, GeoJsonProperties>;
}

export default function FcsRegionTooltip({ feature }: FcsRegionTooltipProps) {
  const fcsPeople = feature.properties?.fcs?.people;
  const fcsMillion = fcsPeople ? formatToMillion(fcsPeople) : 'N/A';
  return (
    <div>
      <h3>{feature.properties?.Name}</h3>
      <p>{fcsMillion} with insufficient food consumption</p>
    </div>
  );
}
