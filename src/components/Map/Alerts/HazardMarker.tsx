import L from 'leaflet';
import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { Hazard } from '@/domain/entities/alerts/Hazard';
import HazardOperations from '@/operations/alerts/HazardOperations';

export function HazardMarker({ hazard }: { hazard: Hazard }) {
  const icon = useMemo(
    () =>
      L.icon({
        iconUrl: HazardOperations.hazardIconUrls[hazard.type],
        popupAnchor: [0, -20],
        iconSize: [40, 40],
      }),
    [hazard]
  );
  return (
    <Marker position={[hazard.latitude, hazard.longitude]} icon={icon}>
      <Popup>{hazard.type}</Popup>
    </Marker>
  );
}
