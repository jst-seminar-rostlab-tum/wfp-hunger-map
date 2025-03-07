'use client';

import { AlertsMenu } from '@/components/AlertsMenu/AlertsMenu';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertsMenuVariant } from '@/domain/enums/AlertsMenuVariant';

/**
 * Wrapper component that conditionally renders the AlertsMenu based on sidebar state.
 * Positions the alerts menu at the bottom left of the viewport when sidebar is closed.
 *
 * @component
 *
 * @returns {React.JSX.Element | null} AlertsMenu component or null if sidebar is open
 */
export function AlertsMenuWrapper(): React.JSX.Element | null {
  const { isSidebarOpen } = useSidebar();

  if (isSidebarOpen) {
    return null;
  }
  return (
    <div className="absolute left-4 z-alertsMenu bottom-4 max-[1000px]:bottom-10">
      <AlertsMenu variant={AlertsMenuVariant.Outside} />
    </div>
  );
}
