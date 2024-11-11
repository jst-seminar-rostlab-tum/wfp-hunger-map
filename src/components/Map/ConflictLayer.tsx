import L, { MarkerCluster } from 'leaflet';
import { useMemo } from 'react';
import { CircleMarker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import { ConflictType } from '@/domain/enums/ConflictType';
import { useConflictQuery } from '@/domain/hooks/alertHooks';
import ConflictOperations from '@/operations/ConflictOperations';
import GeometryOperations from '@/operations/GeometryOperations';

export function ConflictLayer({ maxZoom }: { maxZoom: number }) {
  const { data, isPending } = useConflictQuery();
  const conflictsByType = useMemo(() => ConflictOperations.sortConflictsByType(data), [data]);

  const createClusterCustomIcon = (cluster: MarkerCluster, conflictType: ConflictType) => {
    return L.divIcon({
      html: `<span
              style="
                background-color: ${ConflictOperations.getMarkerColor(conflictType)};
                width: ${Math.min(Math.floor(cluster.getChildCount() / 5) + 20, 40)}px;
                height: ${Math.min(Math.floor(cluster.getChildCount() / 5) + 20, 40)}px;
              "
              class="flex items-center justify-center rounded-full border-white border-1 text-white font-bold"
            >${cluster.getChildCount()}</span>`,
      className: '',
      iconSize: L.point(40, 40, true),
    });
  };
  if (isPending || !data) return null;

  return (
    <>
      {(Object.keys(conflictsByType) as ConflictType[]).map((conflictType) => (
        <MarkerClusterGroup
          key={conflictType}
          iconCreateFunction={(c) => createClusterCustomIcon(c, conflictType)}
          showCoverageOnHover={false}
          spiderLegPolylineOptions={{ weight: 0 }}
          disableClusteringAtZoom={maxZoom}
          zoomToBoundsOnClick={false}
          maxClusterRadius={60}
          spiderfyOnMaxZoom={false}
        >
          {conflictsByType[conflictType].map((m) => (
            <CircleMarker
              radius={3}
              color="white"
              weight={1}
              fillColor={ConflictOperations.getMarkerColor(conflictType)}
              fillOpacity={1}
              key={m.geometry.coordinates.toString()}
              center={GeometryOperations.swapCoords(m.geometry.coordinates)}
            />
          ))}
        </MarkerClusterGroup>
      ))}
    </>
  );
}
