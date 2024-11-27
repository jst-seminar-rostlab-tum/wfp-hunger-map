'use client';

import { AlertsMenu } from '@/components/AlertsMenu/AlertsMenu';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertsMenuVariant } from '@/domain/enums/AlertsMenuVariant';

export function AlertsMenuWrapper() {
  const { isSidebarOpen } = useSidebar();

  if (isSidebarOpen) {
    return null;
  }
  return (
    <div className="absolute bottom-0 left-0 z-alertsMenu mb-10 ml-4">
      <AlertsMenu variant={AlertsMenuVariant.Outside} />
    </div>
  );
}
