import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { AlertType } from '@/domain/enums/AlertType';

import { ConflictLayer } from './ConflictLayer';
import { HazardLayer } from './HazardLayer';

export function AlertContainer() {
  const { selectedAlert } = useSelectedAlert();

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      return <ConflictLayer />;
    case AlertType.HAZARDS:
      return <HazardLayer />;
    default:
      return null; // TODO: hazard layers
  }
}
