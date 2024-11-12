import { Button } from '@nextui-org/button';
import clsx from 'clsx';
import NextImage from 'next/image';
import { forwardRef } from 'react';

import { AlertButtonProps } from '@/domain/props/AlertButtonProps';

export const AlertButton = forwardRef<HTMLButtonElement, AlertButtonProps>(
  ({ icon, label, isSelected, onClick, className, ...props }, ref) => {
    return (
      <Button
        isIconOnly
        radius="full"
        className={clsx(isSelected ? 'bg-primary' : 'bg-content2', className)}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <NextImage
            src={icon}
            alt={label}
            className="object-contain w-auto h-auto max-w-full max-h-full"
            width={24}
            height={24}
          />
        </div>
      </Button>
    );
  }
);
