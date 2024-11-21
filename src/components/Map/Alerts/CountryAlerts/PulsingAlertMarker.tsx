import L from 'leaflet';
import { useMemo } from 'react';
import { Marker } from 'react-leaflet';

import { countryAlertsColors } from '@/domain/constant/alerts/CountryAlertsConstants';
import { CountryAlert } from '@/domain/entities/alerts/CountryAlert';

export function PulsingAlertMarker({ countryAlert }: { countryAlert: CountryAlert }) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: '',
        html: `
          <div class="w-3 h-3 bg-${countryAlertsColors[countryAlert.type]} rounded-full relative">
            <div class="w-4 h-4 bg-${countryAlertsColors[countryAlert.type]} rounded-full animate-pulsingAlert absolute -inset-0.5"></div>
          </div>
        `,
      }),
    [countryAlert]
  );
  return <Marker interactive={false} position={countryAlert.position} icon={icon} />;
}
