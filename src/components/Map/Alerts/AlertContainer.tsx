import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertType } from '@/domain/enums/AlertType';

import { ConflictLayer } from './ConflictLayer';

export function AlertContainer() {
  const { selectedAlert } = useSidebar();

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      return <ConflictLayer />;
    default:
      return null; // TODO: hazard layers
  }
}
