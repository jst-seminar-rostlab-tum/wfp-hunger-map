import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { AlertType } from '@/domain/enums/AlertType';

import { ConflictLayer } from './ConflictLayer';

export function AlertContainer() {
  const { selectedAlert } = useSelectedAlert();

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      return <ConflictLayer />;
    default:
      return null; // TODO: hazard layers
  }
}
