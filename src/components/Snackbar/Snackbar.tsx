'use client';

import clsx from 'clsx';
import { ArrowCircleDown, CloseCircle, InfoCircle, TickCircle } from 'iconsax-react';
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
        return <InfoCircle size={24} className="text-white" />;
      case SnackbarStatus.Error:
        return <CloseCircle size={24} className="text-white" />;
      case SnackbarStatus.Default:
      default:
        return <ArrowCircleDown size={24} />;
    }
  };

  if (!isSnackBarOpen) return null;

  return (
    <div
      className={clsx(
        'absolute z-[9999] flex p-2 rounded-md shadow-lg overflow-hidden h-12',
        statusClass,
        positionClass
      )}
    >
      <div className="flex flex-row items-center mr-4">
        {getStatusIcon()}
        <p className="ml-2 text-white">{message}</p>
      </div>
    </div>
  );
}
