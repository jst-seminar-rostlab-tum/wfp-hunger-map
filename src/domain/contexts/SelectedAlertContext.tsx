import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { AlertType } from '../enums/AlertType';

interface SelectedAlertsState {
  selectedAlert: AlertType | null;
  setSelectedAlert: (value: AlertType) => void;
  isAlertSelected: (alertType: AlertType) => boolean;
  toggleAlert: (alertType: AlertType) => void;
}

const SelectedAlertContext = createContext<SelectedAlertsState | undefined>(undefined);

export function SelectedAlertProvider({ children }: { children: ReactNode }) {
  const [selectedAlert, setSelectedAlert] = useState<AlertType | null>(AlertType.COUNTRY_ALERTS);

  const isAlertSelected = (alertType: AlertType) => selectedAlert === alertType;
  const toggleAlert = (alertType: AlertType) =>
    isAlertSelected(alertType) ? setSelectedAlert(null) : setSelectedAlert(alertType);

  const value = useMemo(
    () => ({
      selectedAlert,
      setSelectedAlert,
      isAlertSelected,
      toggleAlert,
    }),
    [selectedAlert]
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
