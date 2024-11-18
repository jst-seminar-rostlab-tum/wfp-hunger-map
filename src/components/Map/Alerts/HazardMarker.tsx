import './HazardMarker.css';

import { formatDistanceToNow } from 'date-fns';
import L from 'leaflet';
import { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';

import HazardAlertsConstants from '@/domain/constant/alerts/HazardAlertsConstants.ts';
import { Hazard } from '@/domain/entities/alerts/Hazard';

export function HazardMarker({ hazard }: { hazard: Hazard }) {
  const icon = useMemo(
    () =>
      L.icon({
        iconUrl: HazardAlertsConstants.hazardIconUrls[hazard.type],
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
            className={`rounded-full border-4 border-${HazardAlertsConstants.hazardSeverityColors[hazard.severity_id]}`}
            src={HazardAlertsConstants.hazardIconUrls[hazard.type]}
            alt={hazard.type}
            width={56}
            height={56}
          />
          <div className="w-full">
            <h2 className="text-xl text-primary">{hazard.type}</h2>
            <p>{hazard.hazard_name}</p>
            <p>Reported: {formatDistanceToNow(new Date(hazard.create_date), { addSuffix: true })}</p>
            <p>Updated: {formatDistanceToNow(new Date(hazard.last_update), { addSuffix: true })}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
