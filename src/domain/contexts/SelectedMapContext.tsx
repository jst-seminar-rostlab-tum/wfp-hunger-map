import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { GlobalInsight } from '../enums/GlobalInsight';

interface SelectedMapTypeState {
  selectedMapType: GlobalInsight;
  setSelectedMapType: (value: GlobalInsight) => void;
}

const SelectedMapContext = createContext<SelectedMapTypeState | undefined>(undefined);

export function SelectedMapProvider({ children }: { children: ReactNode }) {
  const [selectedMapType, setSelectedMapTypeState] = useState<GlobalInsight>(GlobalInsight.FOOD);
  const setSelectedMapType = (value: GlobalInsight) => {
    setSelectedMapTypeState(value);
    window.gtag('event', `${value}_map_selected`);
  };

  const value = useMemo(
    () => ({
      selectedMapType,
      setSelectedMapType,
    }),
    [selectedMapType]
  );

  return <SelectedMapContext.Provider value={value}>{children}</SelectedMapContext.Provider>;
}

export function useSelectedMap() {
  const context = useContext(SelectedMapContext);
  if (!context) {
    throw new Error('useSelectedMap must be used within a SelectedMapProvider');
  }
  return context;
}
