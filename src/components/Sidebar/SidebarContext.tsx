import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { MapKey } from './Sidebar';

interface SelectedMapTypeState {
  selectedMapType: MapKey;
  setSelectedMapType: (value: MapKey) => void;
}

interface SelectedAlertsState {
  selectedAlert: string;
  setSelectedAlert: (value: string) => void;
  isAlertSelected: (alertType: string) => boolean;
  toggleAlert: (alertType: string) => void;
}

interface SidebarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

interface SidebarContextType extends SidebarState, SelectedMapTypeState, SelectedAlertsState {}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMapType, setSelectedMapType] = useState<MapKey>('food');
  const [selectedAlert, setSelectedAlert] = useState<string>('hunger');

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isAlertSelected = (alertType: string) => selectedAlert === alertType;
  const toggleAlert = (alertType: string) =>
    isAlertSelected(alertType) ? setSelectedAlert('') : setSelectedAlert(alertType);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      selectedMapType,
      selectedAlert,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      setSelectedMapType,
      setSelectedAlert,
      isAlertSelected,
      toggleAlert,
    }),
    [isSidebarOpen, selectedMapType, selectedAlert]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
