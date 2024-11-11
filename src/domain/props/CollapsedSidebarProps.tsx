import { GlobalInsight } from '@/domain/enums/GlobalInsight';

export interface CollapsedSidebarProps {
  selectedMapType: GlobalInsight;
  handleSelectionChange: (key: 'all' | Set<string | number>) => void;
  toggleSidebar: () => void;
}
