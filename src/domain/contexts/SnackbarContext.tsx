/* eslint-disable react/prop-types */ // disable prop-types as they are not needed for this file especially for props.duration

'use client';

import React, { createContext, ReactNode, useContext, useMemo, useRef, useState } from 'react';

import { defaultSnackbarProps } from '../entities/snackbar/Snackbar';
import { SnackbarProps } from '../props/SnackbarProps';

interface SnackBarState {
  snackBarProps: SnackbarProps;
  isSnackBarOpen: boolean;
  showSnackBar: (props: SnackbarProps) => void;
  closeSnackBar: () => void;
}

const SnackbarContext = createContext<SnackBarState | undefined>(undefined);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarProps, setSnackBarProps] = useState<SnackbarProps>(defaultSnackbarProps);

  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timer

  const closeSnackBar = (): void => {
    setIsSnackBarOpen(false);
    // Clear timer after closing snackbar
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const showSnackBar = (props: SnackbarProps): void => {
    // Clear previous snackbar
    if (isSnackBarOpen) {
      closeSnackBar();
    }

    // set a timeout to update UI after closing previous snackbar
    setTimeout(() => {
      setSnackBarProps(props);
      setIsSnackBarOpen(true);

      // Clear previous timer if exists in order to prevent multiple timers
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Automatically close after duration
      if (props.duration !== 0) {
        timerRef.current = setTimeout(() => {
          setIsSnackBarOpen(false);
        }, props.duration || defaultSnackbarProps.duration);
      }
    }, 100);
  };

  const value = useMemo(
    () => ({
      snackBarProps,
      isSnackBarOpen,
      showSnackBar,
      closeSnackBar,
    }),
    [isSnackBarOpen]
  );

  return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>;
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
