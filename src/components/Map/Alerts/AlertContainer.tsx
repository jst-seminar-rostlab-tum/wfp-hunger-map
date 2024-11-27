import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { AlertType } from '@/domain/enums/AlertType';

import { ConflictLayer } from './ConflictLayer';
import { CountryAlertsLayer } from './CountryAlerts/CountryAlertsLayer';
import { HazardLayer } from './HazardLayer';

export function AlertContainer({ countries }: { countries: CountryMapDataWrapper }) {
  const { selectedAlert, isAlertsDisplayDisabled } = useSelectedAlert();

  if (!isAlertsDisplayDisabled) {
    switch (selectedAlert) {
      case AlertType.CONFLICTS:
        return <ConflictLayer />;
      case AlertType.HAZARDS:
        return <HazardLayer />;
      case AlertType.COUNTRY_ALERTS:
        return <CountryAlertsLayer countries={countries} />;
      default:
        return null; // TODO: hazard layers
    }
  } else return null;
}
