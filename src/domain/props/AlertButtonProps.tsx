export interface AlertButtonProps {
  icon: string;
  label: string;
  isSelected: boolean;
  isLoading: boolean;
  onPress?: () => void;
  className?: string;
}
