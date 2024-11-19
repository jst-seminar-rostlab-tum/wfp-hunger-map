import { useSelectedAlert } from '@/domain/contexts/SelectedAlertContext';
import { AlertType } from '@/domain/enums/AlertType';
import { AlertContainerProps } from '@/domain/props/AlertContainerProps';

import { ConflictLayer } from './ConflictLayer';
import { DefaultLayer } from './DefaultLayer/DefaultLayer';
import { HazardLayer } from './HazardLayer';

export function AlertContainer({ countries }: AlertContainerProps) {
  const { selectedAlert } = useSelectedAlert();

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      return <ConflictLayer />;
    case AlertType.HAZARDS:
      return <HazardLayer />;
    case AlertType.HUNGER:
      return <DefaultLayer countries={countries} />;
    default:
      return null; // TODO: hazard layers
  }
}
