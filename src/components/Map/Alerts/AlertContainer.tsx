import React, { useEffect } from 'react';

import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { AlertType } from '@/domain/enums/AlertType';
import { useSelectedAlertQuery } from '@/domain/hooks/queryParamsHooks';
import { AlertContainerProps } from '@/domain/props/AlertConatinerProps';

import { ConflictLayer } from './ConflictLayer';
import { CountryAlertsLayer } from './CountryAlerts/CountryAlertsLayer';
import { HazardLayer } from './HazardLayer';

/**
 * The alert layer that is placed in the leaflet map. Here new alerts can be added.
 */
export const AlertContainer = React.memo(({ countries, alertData }: AlertContainerProps) => {
  const { selectedAlert } = useSelectedAlert();
  const [selectedAlertType, setSelectedAlertType] = useSelectedAlertQuery();

  useEffect(() => {
    if (selectedAlert === AlertType.HAZARDS) {
      setSelectedAlertType(AlertType.HAZARDS);
    } else if (selectedAlert === AlertType.CONFLICTS) {
      setSelectedAlertType(AlertType.CONFLICTS);
    } else if (selectedAlert === AlertType.COUNTRY_ALERTS) {
      setSelectedAlertType(AlertType.COUNTRY_ALERTS);
    }
  }, [selectedAlert, setSelectedAlertType, selectedAlertType]);

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
