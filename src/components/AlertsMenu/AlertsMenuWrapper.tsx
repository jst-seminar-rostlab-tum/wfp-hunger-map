'use client';

import clsx from 'clsx';

import { AlertsMenu } from '@/components/AlertsMenu/AlertsMenu';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertsMenuVariant } from '@/domain/enums/AlertsMenuVariant';
import { useMediaQuery } from '@/utils/resolution';

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
  const isUnder1000 = useMediaQuery('(max-width: 1000px)');
  const isUnder700 = useMediaQuery('(max-width: 700px)');
  const { selectedCountryId } = useSelectedCountryId();

  if (isSidebarOpen) {
    return null;
  }
  return (
    <div
      className={clsx('absolute left-4 z-alertsMenu', {
        'bottom-4': !isUnder1000 || (!selectedCountryId && !isUnder700),
        'bottom-10': isUnder700 || (selectedCountryId && isUnder1000),
      })}
    >
      <AlertsMenu variant={AlertsMenuVariant.Outside} />
    </div>
  );
}
