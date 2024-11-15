import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertType } from '@/domain/enums/AlertType';

import { ConflictLayer } from './ConflictLayer';
import { HazardLayer } from './HazardLayer';

export function AlertContainer() {
  const { selectedAlert } = useSidebar();

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      return <ConflictLayer />;
    case AlertType.HAZARDS:
      return <HazardLayer />;
    default:
      return null; // TODO: hazard layers
  }
}
