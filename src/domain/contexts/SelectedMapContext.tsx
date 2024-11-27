import { sendGAEvent } from '@next/third-parties/google';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { GlobalInsight } from '../enums/GlobalInsight';
import { useSelectedMapVisibility } from './SelectedMapVisibilityContext';

interface SelectedMapTypeState {
  selectedMapType: GlobalInsight;
  setSelectedMapType: (value: GlobalInsight) => void;
}

const SelectedMapContext = createContext<SelectedMapTypeState | undefined>(undefined);

export function SelectedMapProvider({ children }: { children: ReactNode }) {
  const [selectedMapType, setSelectedMapTypeState] = useState<GlobalInsight>(GlobalInsight.FOOD);
  const { setSelectedMapVisibility } = useSelectedMapVisibility();
  const setSelectedMapType = (value: GlobalInsight) => {
    if (value !== selectedMapType) {
      setSelectedMapVisibility(true);
    }
    setSelectedMapTypeState(value);
    sendGAEvent('event', 'selectedMapChanged', {
      mapType: value,
    });
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
