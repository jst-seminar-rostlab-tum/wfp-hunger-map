import { SnackbarPosition, SnackbarStatus } from '../enums/Snackbar';

export const getSnackbarPositionClass = (position: SnackbarPosition): string => {
  switch (position) {
    case SnackbarPosition.TopRight:
      return 'top-4 right-4 transition-all ';
    case SnackbarPosition.TopLeft:
      return 'top-4 left-4 transition-all ';
    case SnackbarPosition.BottomRight:
      return 'bottom-4 right-4 transition-all ';
    case SnackbarPosition.BottomLeft:
      return 'bottom-4 left-4 transition-all ';
    case SnackbarPosition.MiddleMiddle:
      return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all ';
    case SnackbarPosition.TopMiddle:
      return 'top-4 left-1/2 transform -translate-x-1/2 transition-all ';
    case SnackbarPosition.LeftMiddle:
      return 'top-1/2 left-4 transform -translate-y-1/2 transition-all ';
    case SnackbarPosition.RightMiddle:
      return 'top-1/2 right-4 transform -translate-y-1/2 transition-all ';
    case SnackbarPosition.BottomMiddle:
      return 'bottom-4 left-1/2 transform -translate-x-1/2 transition-all ';
    default:
      return 'top-4 right-4 transition-all ';
  }
};

export const getStatusColorClass = (status: SnackbarStatus): string => {
  switch (status) {
    case SnackbarStatus.Success:
      return 'bg-success';
    case SnackbarStatus.Warning:
      return 'bg-warning';
    case SnackbarStatus.Error:
      return 'bg-danger';
    case SnackbarStatus.Default:
    default:
      return 'bg-default';
  }
};

export interface SnackbarProps {
  message: string;
  status: SnackbarStatus;
  position: SnackbarPosition;
  duration: number;
}
