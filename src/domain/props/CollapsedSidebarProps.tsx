import { GlobalInsight } from '../enums/GlobalInsight';

export interface CollapsedSidebarProps {
  mapDataFetching: Partial<Record<GlobalInsight, boolean>>;
}
