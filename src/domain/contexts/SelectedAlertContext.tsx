import { createContext, ReactNode, useContext, useMemo } from 'react';

import { useQueryParams } from '@/domain/contexts/QueryParamsContext';
import { AlertType } from '@/domain/enums/AlertType';

interface SelectedAlertsState {
  selectedAlert: AlertType | null;
  isAlertSelected: (alertType: AlertType) => boolean;
  toggleAlert: (alertType: AlertType) => void;
}

const SelectedAlertContext = createContext<SelectedAlertsState | undefined>(undefined);

export function SelectedAlertProvider({ children }: { children: ReactNode }) {
  const { queryParams, setQueryParam } = useQueryParams();

  const isAlertSelected = (alertType: AlertType) => queryParams.alert === alertType;
  const toggleAlert = (alertType: AlertType) => {
    if (isAlertSelected(alertType)) {
      setQueryParam('alert', null);
    } else {
      setQueryParam('alert', alertType);

      // send event to Google Analytics
      window.gtag('event', `${alertType}_alert_selected`);
    }
  };

  const value = useMemo(
    () => ({
      selectedAlert: queryParams.alert ?? null,
      isAlertSelected,
      toggleAlert,
    }),
    [queryParams.alert]
  );

  return <SelectedAlertContext.Provider value={value}>{children}</SelectedAlertContext.Provider>;
}

export function useSelectedAlert() {
  const context = useContext(SelectedAlertContext);
  if (!context) {
    throw new Error('useSelectedAlert must be used within a SelectedAlertProvider');
  }
  return context;
}
