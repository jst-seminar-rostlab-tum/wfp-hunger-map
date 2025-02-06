import { ButtonProps } from '@nextui-org/button';

export interface AlertButtonProps extends ButtonProps {
  icon: string;
  label: string;
  isSelected: boolean;
  isLoading: boolean;
  onPress?: () => void;
  className?: string;
}
