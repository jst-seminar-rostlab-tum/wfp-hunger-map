import { useMemo } from 'react';
import { CircleMarker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import { MAP_MAX_ZOOM } from '@/domain/constant/Map';
import { ConflictType } from '@/domain/enums/ConflictType';
import { useConflictQuery } from '@/domain/hooks/alertHooks';
import ConflictOperations from '@/operations/alerts/ConflictOperations';
import GeometryOperations from '@/operations/GeometryOperations';
import { getTailwindColor } from '@/utils/tailwind-util';

export function ConflictLayer() {
  const { data, isPending } = useConflictQuery();
  const conflictsByType = useMemo(() => ConflictOperations.sortConflictsByType(data), [data]);

  return (
    <div>
      {!isPending &&
        data &&
        (Object.keys(conflictsByType) as ConflictType[]).map((conflictType) => (
          <MarkerClusterGroup
            animate={false}
            key={conflictType}
            iconCreateFunction={(cluster) => ConflictOperations.createClusterCustomIcon(cluster, conflictType)}
            showCoverageOnHover={false}
            spiderLegPolylineOptions={{ weight: 0 }}
            disableClusteringAtZoom={MAP_MAX_ZOOM}
            zoomToBoundsOnClick={false}
            maxClusterRadius={60}
            spiderfyOnMaxZoom={false}
          >
            {conflictsByType[conflictType].map((marker) => (
              <CircleMarker
                radius={3}
                color="white"
                fillColor={getTailwindColor(`--nextui-${ConflictOperations.getMarkerColor(conflictType)}`)}
                weight={1}
                fillOpacity={1}
                key={marker.geometry.coordinates.toString()}
                center={GeometryOperations.swapCoords(marker.geometry.coordinates)}
              />
            ))}
          </MarkerClusterGroup>
        ))}
    </div>
  );
}
