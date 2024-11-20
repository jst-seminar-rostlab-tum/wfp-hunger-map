import { useMemo } from 'react';

import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import CountryAlertsOperations from '@/operations/alerts/CountryAlertsOperations';

import { PulsingAlertMarker } from './PulsingAlertMarker';

export function CountryAlertsLayer({ countries }: { countries: CountryMapDataWrapper }) {
  const countryAlerts = useMemo(() => CountryAlertsOperations.getFromMapData(countries), [countries]);

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
