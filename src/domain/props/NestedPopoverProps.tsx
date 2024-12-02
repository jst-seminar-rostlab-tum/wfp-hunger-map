import { ITopic } from '../entities/subscribe/Subscribe';

export interface NestedPopoverProps {
  items: ITopic[];
  onSelectionChange: (topic: ITopic | undefined) => void;
}
