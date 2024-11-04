'use client';

import { useSidebar } from '../Sidebar/SidebarContext';
import AlertsMenu from './AlertsMenu';

export default function AlertsMenuWrapper() {
  const { isSidebarOpen } = useSidebar();

  if (isSidebarOpen) {
    return null;
  }
  return (
    <div className="absolute bottom-0 left-0 z-50 p-4">
      <AlertsMenu variant="outside" />
    </div>
  );
}
