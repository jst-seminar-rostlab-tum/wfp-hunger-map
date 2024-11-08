'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { AlertType } from '@/domain/enums/AlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';

interface SelectedMapTypeState {
  selectedMapType: GlobalInsight;
  setSelectedMapType: (value: GlobalInsight) => void;
}

interface SelectedAlertsState {
  selectedAlert: AlertType | null;
  setSelectedAlert: (value: AlertType) => void;
  isAlertSelected: (alertType: AlertType) => boolean;
  toggleAlert: (alertType: AlertType) => void;
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
  const [selectedMapType, setSelectedMapType] = useState<GlobalInsight>(GlobalInsight.FOOD);
  const [selectedAlert, setSelectedAlert] = useState<AlertType | null>(AlertType.HUNGER);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isAlertSelected = (alertType: AlertType) => selectedAlert === alertType;
  const toggleAlert = (alertType: AlertType) =>
    isAlertSelected(alertType) ? setSelectedAlert(null) : setSelectedAlert(alertType);

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
