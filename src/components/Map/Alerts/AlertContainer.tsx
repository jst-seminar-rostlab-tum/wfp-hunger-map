import React from 'react';

import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { AlertType } from '@/domain/enums/AlertType';

import { ConflictLayer } from './ConflictLayer';
import { CountryAlertsLayer } from './CountryAlerts/CountryAlertsLayer';
import { HazardLayer } from './HazardLayer';

export const AlertContainer = React.memo(({ countries }: { countries: CountryMapDataWrapper }) => {
  const { selectedAlert } = useSelectedAlert();

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      return <ConflictLayer />;
    case AlertType.HAZARDS:
      return <HazardLayer />;
    case AlertType.COUNTRY_ALERTS:
      return <CountryAlertsLayer countries={countries} />;
    default:
      return null;
  }
});
