import './HazardMarker.css';

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
      <Popup className="hazardMarkerPopup">
        <div className="flex gap-4 items-center">
          <img
            className={`rounded-full border-4 border-${HazardOperations.hazardSeverityColors[hazard.severity_id]}`}
            src={HazardOperations.hazardIconUrls[hazard.type]}
            alt={hazard.type}
            width={56}
            height={56}
          />
          <div className="w-full">
            <h2 className="text-xl text-primary">{hazard.type}</h2>
            <p>{hazard.hazard_name}</p>
            <p>Reported: TODO</p>
            <p>Updated: TODO</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
