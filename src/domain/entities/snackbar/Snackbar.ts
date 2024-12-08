import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { SnackbarProps } from '@/domain/props/SnackbarProps';

export const SNACKBAR_LONG_DURATION = 6000;

export const SNACKBAR_SHORT_DURATION = 3000;

export const defaultSnackbarProps: SnackbarProps = {
  message: 'This is a snackbar message',
  status: SnackbarStatus.Default,
  position: SnackbarPosition.TopRight,
  duration: SNACKBAR_SHORT_DURATION,
};
