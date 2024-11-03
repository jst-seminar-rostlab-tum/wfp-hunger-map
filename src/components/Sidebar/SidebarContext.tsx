import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface SelectedMapType {
  selectedMapType: string;
  setSelectedMapType: (value: string) => void;
}

interface SidebarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

interface SidebarContextType extends SidebarState, SelectedMapType {}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMapType, setSelectedMapType] = useState<string>('food');

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      selectedMapType,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      setSelectedMapType,
    }),
    [isSidebarOpen, selectedMapType] // Only re-create when isOpen changes
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
