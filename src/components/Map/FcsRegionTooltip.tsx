import { Feature, GeoJsonProperties, Geometry } from 'geojson';

import { FcsRegionTooltipOperations } from '@/operations/map/FcsRegionTooltipOperations';
import { formatToMillion } from '@/utils/formatting';

import { LineChart } from '../Charts/LineChart';

interface FcsRegionTooltipProps {
  feature: Feature<Geometry, GeoJsonProperties>;
}

export default function FcsRegionTooltip({ feature }: FcsRegionTooltipProps) {
  const fcsPeople = feature.properties?.fcs?.people;
  const fcsMillion = fcsPeople ? formatToMillion(fcsPeople) : 'N/A';
  const fcsRatio = feature?.properties?.fcs?.ratio || 'N/A';
  const rcsiPeople = feature.properties?.rcsi?.people;
  const rcsiMillion = rcsiPeople ? formatToMillion(rcsiPeople) : 'N/A';
  const rcsiRatio = feature?.properties?.rcsi?.ratio || 'N/A';
  return (
    <div className="bg-background text-foreground rounded-md shadow-md max-w-sm z-9999">
      <div className="p-4">
        <h3 className="text-lg text-foreground font-bold">{feature.properties?.Name}</h3>
        <div className="mt-2 text-foreground">
          <p>
            <span className="text-clusterOrange font-bold">
              {fcsRatio}% ({fcsMillion}M)
            </span>{' '}
            with insufficient food consumption
          </p>
          <p>
            <span className="text-clusterOrange font-bold">
              {rcsiRatio}% ({rcsiMillion}M)
            </span>{' '}
            with crisis or above crisis food-based coping
          </p>
        </div>
      </div>
      <div className="px-1">
        {feature.properties?.fcsGraph && (
          <LineChart
            title="Number of people with insufficient food consumption"
            data={FcsRegionTooltipOperations.getFcsChartData(feature.properties.fcsGraph)}
            small
          />
        )}
      </div>
    </div>
  );
}
