/* eslint-disable react/prop-types */ // disable prop-types as they are not needed for this file especially for props.duration

'use client';

import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

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
  const showSnackBar = (props: SnackbarProps): void => {
    setSnackBarProps(props);
    setIsSnackBarOpen(true);

    // Automatically close after duration
    if (props.duration !== 0) {
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, props.duration || defaultSnackbarProps.duration);
    }
  };

  const closeSnackBar = (): void => {
    setIsSnackBarOpen(false);
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
