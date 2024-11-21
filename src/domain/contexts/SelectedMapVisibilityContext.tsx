import { createContext, useContext, useMemo, useState } from 'react';

interface SelectedMapVisibilityState {
  selectedMapVisibility: boolean;
  setSelectedMapVisibility: (value: boolean) => void;
}

const SelectedMapVisibilityContext = createContext<SelectedMapVisibilityState | undefined>(undefined);

export function SelectedMapVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [selectedMapVisibility, setSelectedMapVisibility] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      selectedMapVisibility,
      setSelectedMapVisibility,
    }),
    [selectedMapVisibility]
  );

  return <SelectedMapVisibilityContext.Provider value={value}>{children}</SelectedMapVisibilityContext.Provider>;
}

export function useSelectedMapVisibility() {
  const context = useContext(SelectedMapVisibilityContext);
  if (!context) {
    throw new Error('useSelectedMapVisibility must be used within a SelectedMapVisibilityProvider');
  }
  return context;
}
