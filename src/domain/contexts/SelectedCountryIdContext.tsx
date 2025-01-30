import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

import { useQueryParams } from '@/domain/contexts/QueryParamsContext';
import { AlertType } from '@/domain/enums/AlertType';

interface SelectedCountryIdState {
  selectedCountryId: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
}

const SelectedCountryIdContext = createContext<SelectedCountryIdState | undefined>(undefined);

export function SelectedCountryIdProvider({ children }: { children: React.ReactNode }) {
  const { queryParams, setQueryParam, setQueryParams } = useQueryParams();
  const prevAlertRef = useRef<AlertType | null>(null);
  const prevCountryIdRef = useRef<number | null | undefined>(undefined);

  // initialize prevCountryIdRef
  useEffect(() => {
    if (prevCountryIdRef.current === undefined) prevCountryIdRef.current = queryParams.countryId;
  }, [queryParams.countryId]);

  // update countryId from user input
  const setSelectedCountryId = (newId: number | null) => {
    if (newId && !prevCountryIdRef.current) {
      // Country is selected. Store current alert before clearing it
      if (queryParams.alert !== undefined) prevAlertRef.current = queryParams.alert;
      else prevAlertRef.current = AlertType.COUNTRY_ALERTS;
      setQueryParams((prevParams) => ({ ...prevParams, alert: null, countryId: newId }));
    } else if (newId == null && prevCountryIdRef.current && !queryParams.alert) {
      // Country is deselected and there is no alert selected. Restore previous alert
      setQueryParams((prevParams) => ({ ...prevParams, alert: prevAlertRef.current, countryId: newId }));
    } else {
      setQueryParam('countryId', newId);
    }
    prevCountryIdRef.current = newId;
  };

  const value = useMemo(() => {
    return {
      selectedCountryId: queryParams.countryId ?? null,
      setSelectedCountryId,
    };
  }, [queryParams.countryId]);

  return <SelectedCountryIdContext.Provider value={value}>{children}</SelectedCountryIdContext.Provider>;
}

export function useSelectedCountryId() {
  const context = useContext(SelectedCountryIdContext);
  if (!context) {
    throw new Error('useSelectedCountryId must be used within a SelectedCountryIdProvider');
  }
  return context;
}
