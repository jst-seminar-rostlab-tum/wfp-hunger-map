import { InfoCircle, TickCircle } from 'iconsax-react';
import { TriangleAlert } from 'lucide-react';

import { SnackbarStatus } from '@/domain/enums/Snackbar';

export class SnackbarOperations {
  public static getStatusIcon = (status: SnackbarStatus) => {
    switch (status) {
      case SnackbarStatus.Success:
        return <TickCircle size={24} className="text-white" />;
      case SnackbarStatus.Warning:
        return <TriangleAlert size={24} className="text-white" />;
      case SnackbarStatus.Error:
        return <InfoCircle size={24} className="text-white" />;
      case SnackbarStatus.Default:
      default:
        return null;
    }
  };
}
