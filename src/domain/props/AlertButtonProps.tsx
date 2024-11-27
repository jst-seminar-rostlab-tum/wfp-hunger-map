export interface AlertButtonProps {
  icon: string;
  label: string;
  isSelected: boolean;
  isLoading: boolean;
  onClick?: () => void;
  className?: string;
}
