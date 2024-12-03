import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { SnackbarProps } from '@/domain/props/SnackbarProps';

export const defaultSnackbarProps: SnackbarProps = {
  title: 'Snackbar open',
  message: 'This is a snackbar message',
  status: SnackbarStatus.Default,
  position: SnackbarPosition.TopRight,
  duration: 3000,
};
