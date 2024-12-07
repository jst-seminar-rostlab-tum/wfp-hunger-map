'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { InfoCircle, TickCircle } from 'iconsax-react';
import { TriangleAlert, X } from 'lucide-react';

import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { SnackbarStatus } from '@/domain/enums/Snackbar';
import { getSnackbarPositionClass, getStatusColorClass } from '@/domain/props/SnackbarProps';

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
        positionClass,
        statusClass
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
