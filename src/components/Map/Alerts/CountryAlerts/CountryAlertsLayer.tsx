import { useMemo } from 'react';

import { CountryAlertsLayerProps } from '@/domain/props/CountryAlertsLayerProps';
import CountryAlertsOperations from '@/operations/alerts/CountryAlertsOperations';

import { PulsingAlertMarker } from './PulsingAlertMarker';

export function CountryAlertsLayer({ countries, alerts }: CountryAlertsLayerProps) {
  const countryAlerts = useMemo(() => CountryAlertsOperations.getFromMapData(alerts, countries), [countries]);

  return (
    <div>
      {countryAlerts.map((countryAlert) => {
        return (
          <PulsingAlertMarker
            key={`${countryAlert.type}${countryAlert.position.toString()}`}
            countryAlert={countryAlert}
          />
        );
      })}
    </div>
  );
}
