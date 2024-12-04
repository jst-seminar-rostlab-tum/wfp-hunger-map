'use client';

import clsx from 'clsx';
import { InfoCircle, TickCircle } from 'iconsax-react';
import { TriangleAlert, X } from 'lucide-react';
import React, { useEffect } from 'react';

import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { SnackbarStatus } from '@/domain/enums/Snackbar';
import { getSnackbarPositionClass, getStatusColorClass } from '@/domain/props/SnackbarProps';

export function Snackbar() {
  const { isSnackBarOpen, snackBarProps, closeSnackBar } = useSnackbar();
  const { message, status, position, duration } = snackBarProps;
  // const [progress, setProgress] = useState(100);

  const positionClass = getSnackbarPositionClass(position);
  const statusClass = getStatusColorClass(status);

  useEffect(() => {
    if (isSnackBarOpen) {
      let interval: NodeJS.Timeout;
      if (duration && duration > 0) {
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

  const getStatusIcon = () => {
    switch (status) {
      case SnackbarStatus.Success:
        return <TickCircle size={24} className="text-white" />;
      case SnackbarStatus.Warning:
        return <TriangleAlert size={24} className="text-white" />;
      case SnackbarStatus.Error:
        return <InfoCircle size={24} className="text-white" />;
      case SnackbarStatus.Default:
      default:
        return null;
    }
  };

  if (!isSnackBarOpen) return null;

  return (
    <div className={clsx('absolute z-[9999] flex p-2 rounded-md shadow-lg h-12', statusClass, positionClass)}>
      <div className="flex flex-1 flex-row items-center">
        {getStatusIcon()}
        <p className="ml-2 text-white mr-8">{message}</p>
        <X size={24} className="text-white ml-auto mr-1" onClick={closeSnackBar} />
      </div>
    </div>
  );
}
