import { Feature, GeoJsonProperties, Geometry } from 'geojson';

import { ContinuousChart } from '@/components/Charts/ContinuousChart';
import { FcsRegionTooltipOperations } from '@/operations/map/FcsRegionTooltipOperations';
import { formatToMillion } from '@/utils/formatting';

interface FcsRegionTooltipProps {
  feature: Feature<Geometry, GeoJsonProperties>;
}

/** FcsRegionTooltip function returns a component that displays the tooltip on a region in the fcs map.
 * @param {FcsRegionTooltipProps} props - The props of the component
 * @param {Feature<Geometry, GeoJsonProperties>} props.feature - The GeoJSON data of the region
 * @returns {JSX.Element} - The rendered FcsRegionTooltip component
 */

export default function FcsRegionTooltip({ feature }: FcsRegionTooltipProps): JSX.Element {
  const fcsPeople = feature.properties?.fcs?.people;
  const fcsMillion = fcsPeople ? formatToMillion(fcsPeople) : null;
  const fcsRatio = feature?.properties?.fcs?.ratio;
  const rcsiPeople = feature.properties?.rcsi?.people;
  const rcsiMillion = rcsiPeople ? formatToMillion(rcsiPeople) : null;
  const rcsiRatio = feature?.properties?.rcsi?.ratio || null;
  return (
    <div className="bg-background text-foreground rounded-md shadow-md max-w-sm z-9999">
      <div className="px-4 py-4">
        <h3 className="text-lg text-foreground font-bold">{feature.properties?.Name}</h3>
        <div className="mt-2 text-foreground">
          <p>
            {fcsMillion && fcsRatio ? (
              <>
                <span className="text-clusterOrange font-bold">
                  {fcsRatio}% ({fcsMillion}M){' '}
                </span>
                with insufficient food consumption
              </>
            ) : (
              'No data about insufficient food consumption.'
            )}
          </p>
          <p>
            {rcsiRatio && rcsiMillion ? (
              <>
                <span className="text-clusterOrange font-bold">
                  {rcsiRatio}% ({rcsiMillion}M){' '}
                </span>
                with crisis or above crisis food-based coping
              </>
            ) : (
              'No data about crisis or above crisis food-based coping.'
            )}
          </p>
        </div>
      </div>
      <div className="px-1">
        {feature.properties?.fcsGraph && (
          <ContinuousChart
            title="Number of people with insufficient food consumption"
            data={FcsRegionTooltipOperations.getFcsChartData(feature.properties.fcsGraph)}
            small
            disableDownload
            disableBarChartSwitch
            disableXAxisSlider
            disableExpandable
          />
        )}
      </div>
    </div>
  );
}
