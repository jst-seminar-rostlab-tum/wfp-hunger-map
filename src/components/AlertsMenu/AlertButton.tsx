import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import clsx from 'clsx';
import NextImage from 'next/image';
import { forwardRef } from 'react';

import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertButtonProps } from '@/domain/props/AlertButtonProps';

export const AlertButton = forwardRef<HTMLButtonElement, AlertButtonProps>(
  ({ icon, label, isSelected, isLoading, onClick, className, ...props }, ref) => {
    const { isSidebarOpen } = useSidebar();
    return (
      <Button
        isIconOnly
        radius="full"
        className={clsx(
          {
            'bg-content2': isSidebarOpen,
            'bg-content1': !isSidebarOpen,
            'hover:bg-content2': !isSidebarOpen,
            'bg-primary': !isLoading && isSelected,
            'hover:bg-hover': !isLoading && isSelected,
          },
          className
        )}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        <div className="w-6 h-6 flex items-center justify-center relative">
          <NextImage
            src={icon}
            alt={label}
            className="object-contain w-auto h-auto max-w-full max-h-full"
            width={24}
            height={24}
          />
          {isLoading && <Spinner className="absolute" />}
        </div>
      </Button>
    );
  }
);
