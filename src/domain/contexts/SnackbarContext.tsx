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

/**
 * Below is an example of how to use the Snackbar componenet and useSnackbar hooks:
 *
 * 1. Extract showSnackBar and closeSnackBar from the snackbar context
 * const { showSnackBar, closeSnackBar } = useSnackbar();
 *
 * 2. Function to handle showing the snackbar
 * const handleShowSnackbar = () => {
 *    // Call showSnackBar with appropriate props to display a snackbar
 *    showSnackBar({
 *      message: 'This is a success message!', // Message to be displayed
 *      status: SnackbarStatus.Success, // Set status (Success, Warning, Error, Default)
 *      position: SnackbarPosition.BottomRight, // Position of the snackbar on the screen (check enum for all positions)
 *      duration: 3000, // Duration for which the snackbar is displayed (in milliseconds)
 *    });
 *  };
 *
 *  3. Optional: Function to manually close the snackbar before the duration ends or to close it immediately and add your own logic
 *  const handleCloseSnackbar = () => {
 *    closeSnackBar(); // Call to manually close the snackbar
 *  };
 */
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
