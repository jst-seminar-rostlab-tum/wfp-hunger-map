import { ITopic } from '../entities/subscribe/Subscribe';

export interface NestedPopoverProps {
  label: string;
  items: ITopic[];
  onSelectionChange: (topic: ITopic | undefined) => void;
}
