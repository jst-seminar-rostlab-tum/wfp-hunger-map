import React from 'react';

import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { AlertType } from '@/domain/enums/AlertType';
import { AlertContainerProps } from '@/domain/props/AlertConatinerProps';

import { ConflictLayer } from './ConflictLayer';
import { CountryAlertsLayer } from './CountryAlerts/CountryAlertsLayer';
import { HazardLayer } from './HazardLayer';

export const AlertContainer = React.memo(({ countries, alertData }: AlertContainerProps) => {
  const { selectedAlert } = useSelectedAlert();

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      return <ConflictLayer />;
    case AlertType.HAZARDS:
      return <HazardLayer />;
    case AlertType.COUNTRY_ALERTS:
      return <CountryAlertsLayer countries={countries} alerts={alertData} />;
    default:
      return null;
  }
});
