import { SnackbarPosition, SnackbarStatus } from '../enums/Snackbar';

export const getSnackbarPositionClass = (position: SnackbarPosition): string => {
  switch (position) {
    case SnackbarPosition.TopRight:
      return 'fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out';
    case SnackbarPosition.TopLeft:
      return 'fixed top-4 left-4 z-50 transition-all duration-300 ease-in-out';
    case SnackbarPosition.BottomRight:
      return 'fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out';
    case SnackbarPosition.BottomLeft:
      return 'fixed bottom-4 left-4 z-50 transition-all duration-300 ease-in-out';
    case SnackbarPosition.MiddleMiddle:
      return 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out';
    case SnackbarPosition.TopMiddle:
      return 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out';
    case SnackbarPosition.LeftMiddle:
      return 'fixed top-1/2 left-4 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out';
    case SnackbarPosition.RightMiddle:
      return 'fixed top-1/2 right-4 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out';
    case SnackbarPosition.BottomMiddle:
      return 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out';
    default:
      return 'fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out';
  }
};

export const getStatusColorClass = (status: SnackbarStatus): string => {
  switch (status) {
    case SnackbarStatus.Success:
      return 'bg-green-500';
    case SnackbarStatus.Warning:
      return 'bg-yellow-500';
    case SnackbarStatus.Error:
      return 'bg-red-500';
    case SnackbarStatus.Default:
    default:
      return 'bg-gray-500';
  }
};

export interface SnackbarProps {
  title: string;
  message: string;
  status: SnackbarStatus;
  position: SnackbarPosition;
  duration: number;
}
