import L from 'leaflet';
import { useMemo } from 'react';
import { Marker } from 'react-leaflet';

// const colorClasses = {
//   fatalityAlert: 'bg-fatalityAlert',
//   climateWetAlert: 'bg-climateWetAlert',
//   climateDryAlert: 'bg-climateDryAlert',
// } as const;

export function PulsingAlertMarker({ color, position }: { color: string; position: L.LatLngExpression }) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: '',
        html: `
          <div class="w-3 h-3 ${color} rounded-full relative"><div class="w-4 h-4 ${color} rounded-full animate-ping absolute -inset-0.5"></div></div>
        `,
      }),
    []
  );
  return <Marker interactive={false} position={position} icon={icon} />;
}
