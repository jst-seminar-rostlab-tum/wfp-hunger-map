'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { InfoCircle, TickCircle } from 'iconsax-react';
import { TriangleAlert, X } from 'lucide-react';

import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { SnackbarStatus } from '@/domain/enums/Snackbar';
import { getSnackbarPositionClass, getStatusColorClass } from '@/domain/props/SnackbarProps';

export function Snackbar() {
  const { isSnackBarOpen, snackBarProps, closeSnackBar } = useSnackbar();
  const { message, status, position } = snackBarProps;

  const positionClass = getSnackbarPositionClass(position);
  const statusClass = getStatusColorClass(status);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'absolute z-[9999] flex p-2 rounded-md shadow-lg h-12 flex-1 sm:w-[500px] w-full',
        statusClass,
        positionClass
      )}
    >
      <div className="flex flex-1 flex-row items-center">
        {getStatusIcon()}
        <p className="ml-2 text-white mr-8">{message}</p>
        <X size={24} className="text-white ml-auto mr-1" onClick={closeSnackBar} />
      </div>
    </motion.div>
  );
}
