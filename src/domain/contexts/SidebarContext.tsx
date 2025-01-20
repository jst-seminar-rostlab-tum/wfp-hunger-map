'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

/**
 * Interface describing the shape of the sidebar context state and actions
 * @interface
 */
interface SidebarState {
  /** Whether the sidebar is currently expanded */
  isSidebarOpen: boolean;
  /** Toggle the sidebar open/closed state */
  toggleSidebar: () => void;
  /** Explicitly open the sidebar */
  openSidebar: () => void;
  /** Explicitly close the sidebar */
  closeSidebar: () => void;
}

/**
 * Context for managing the sidebar's open/closed state across the application
 * @type {React.Context<SidebarState | undefined>}
 */
const SidebarContext: React.Context<SidebarState | undefined> = createContext<SidebarState | undefined>(undefined);

/**
 * Provider component that manages sidebar state
 *
 * @component
 * @example
 * ```tsx
 * <SidebarProvider>
 *   <App />
 * </SidebarProvider>
 * ```
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      openSidebar,
      closeSidebar,
    }),
    [isSidebarOpen]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

/**
 * Hook to access sidebar state and actions
 *
 * @throws {Error} When used outside of SidebarProvider
 * @example
 * ```tsx
 * const { isSidebarOpen, toggleSidebar } = useSidebar();
 * ```
 */
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
