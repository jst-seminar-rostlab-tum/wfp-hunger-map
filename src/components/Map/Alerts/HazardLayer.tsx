import { useMemo } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';

import LegendContainer from '@/components/Legend/LegendContainer';
import { MAP_MAX_ZOOM } from '@/domain/constant/Map';
import { HazardType } from '@/domain/enums/HazardType';
import { useHazardQuery } from '@/domain/hooks/alertHooks';
import HazardOperations from '@/operations/alerts/HazardOperations';

import { HazardMarker } from './HazardMarker';

export function HazardLayer() {
  const { data, isPending } = useHazardQuery();
  const hazardsByType = useMemo(() => HazardOperations.sortHazardsByType(data), [data]);

  return (
    <>
      <div className="absolute bottom-6 right-8 z-9999">
        <LegendContainer loading={isPending || !data} items={HazardOperations.generateHazardLegend()} />
      </div>
      {data &&
        !isPending &&
        (Object.keys(hazardsByType) as HazardType[]).map((hazardType) => (
          <MarkerClusterGroup
            key={hazardType}
            iconCreateFunction={(cluster) => HazardOperations.createClusterCustomIcon(cluster, hazardType)}
            showCoverageOnHover={false}
            spiderLegPolylineOptions={{ weight: 0 }}
            disableClusteringAtZoom={MAP_MAX_ZOOM}
            zoomToBoundsOnClick
            maxClusterRadius={60}
            spiderfyOnMaxZoom={false}
          >
            {hazardsByType[hazardType].map((hazard) => (
              <HazardMarker key={hazard.create_date + hazard.latitude + hazard.longitude} hazard={hazard} />
            ))}
          </MarkerClusterGroup>
        ))}
    </>
  );
}
