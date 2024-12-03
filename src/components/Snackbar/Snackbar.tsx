'use client';

import { Progress } from '@nextui-org/progress';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { getSnackbarPositionClass, getStatusColorClass } from '@/domain/props/SnackbarProps';

export function Snackbar() {
  const { isSnackBarOpen, snackBarProps, closeSnackBar } = useSnackbar();
  const { title, message, status, position, duration } = snackBarProps;
  const [progress, setProgress] = useState(100);

  const positionClass = getSnackbarPositionClass(position);
  const statusClass = getStatusColorClass(status);

  useEffect(() => {
    if (isSnackBarOpen) {
      let interval: NodeJS.Timeout;
      if (duration && duration > 0) {
        const step = 100 / (duration / 100);
        interval = setInterval(() => {
          setProgress((prev) => Math.max(prev - step, 0));
        }, 100);

        const timer = setTimeout(() => {
          closeSnackBar();
          clearInterval(interval);
        }, duration);

        return () => {
          clearTimeout(timer);
          clearInterval(interval);
        };
      }
    }

    return () => {};
  }, [isSnackBarOpen, duration, closeSnackBar]);

  if (!isSnackBarOpen) return null;

  return (
    <div className={clsx(positionClass, 'fixed z-[9999]')}>
      <div className={clsx('rounded-md shadow-lg overflow-hidden', statusClass)}>
        <div className="px-4 py-2">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-white">{message}</p>
        </div>
        {duration && duration > 0 && (
          <Progress value={progress} color="default" className="h-1 rounded-none" aria-label="Snackbar timer" />
        )}
      </div>
    </div>
  );
}
