import { useLeafletContext } from '@react-leaflet/core';
import React, { useMemo } from 'react';

import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import CountryAlertsOperations from '@/operations/alerts/CountryAertsOperations';

import { PulsingAlertMarker } from './PulsingAlertMarker';

export function CountryAlertsLayer({ countries }: { countries: CountryMapDataWrapper }) {
  const { map } = useLeafletContext();

  const countryAlerts = useMemo(() => CountryAlertsOperations.getFromMapData(countries, map), [countries, map]);

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
