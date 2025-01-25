import { createContext, ReactNode, useContext, useEffect, useMemo, useRef } from 'react';

import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { AlertType } from '@/domain/enums/AlertType';
import { useSelectedAlertParam } from '@/domain/hooks/queryParamsHooks';

interface SelectedAlertsState {
  selectedAlert: AlertType | null;
  setSelectedAlert: (alertType: AlertType | null) => void;
  isAlertSelected: (alertType: AlertType) => boolean;
  toggleAlert: (alertType: AlertType) => void;
}

const SelectedAlertContext = createContext<SelectedAlertsState | undefined>(undefined);

export function SelectedAlertProvider({ children }: { children: ReactNode }) {
  const [selectedAlert, setSelectedAlert] = useSelectedAlertParam();
  const prevAlertRef = useRef<AlertType | null>(null);
  const prevCountryIdRef = useRef<number | null>(null);
  const { selectedCountryId } = useSelectedCountryId();

  useEffect(() => {
    if (!prevCountryIdRef.current && selectedCountryId) {
      // Country is selected. Store current alert before clearing it
      prevAlertRef.current = selectedAlert;
      setSelectedAlert(null);
    } else if (prevCountryIdRef.current && !selectedCountryId && !selectedAlert) {
      // Country is deselected and there is no alert selected. Restore previous alert
      setSelectedAlert(prevAlertRef.current);
    }
    prevCountryIdRef.current = selectedCountryId;
  }, [selectedCountryId]);

  const isAlertSelected = (alertType: AlertType) => selectedAlert === alertType;
  const toggleAlert = (alertType: AlertType) => {
    if (isAlertSelected(alertType)) {
      setSelectedAlert(null);
    } else {
      setSelectedAlert(alertType);

      // send event to Google Analytics
      window.gtag('event', `${alertType}_alert_selected`);
    }
  };

  const value = useMemo(
    () => ({
      selectedAlert,
      isAlertSelected,
      toggleAlert,
      setSelectedAlert,
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
