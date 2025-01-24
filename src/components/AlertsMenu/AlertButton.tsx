import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import clsx from 'clsx';
import NextImage from 'next/image';
import { forwardRef } from 'react';

import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertButtonProps } from '@/domain/props/AlertButtonProps';

/**
 * AlertButton component renders a circular button with an icon, used in the alerts menu.
 * Supports loading states, selection states, and forwards refs.
 *
 * @component
 * @example
 * ```tsx
 * <AlertButton
 *   icon="/path/to/icon.svg"
 *   label="Hazard Alert"
 *   isSelected={false}
 *   isLoading={false}
 *   onClick={() => {}}
 * />
 * ```
 *
 * @param {AlertButtonProps} props - Component props
 * @param {string} props.icon - Path to the icon image
 * @param {string} props.label - Button label (used for accessibility)
 * @param {boolean} [props.isSelected] - Whether the button is in selected state
 * @param {boolean} [props.isLoading] - Whether to show loading spinner
 * @param {() => void} props.onClick - Click handler function
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref
 *
 * @returns {ForwardRefExoticComponent<AlertButtonProps & RefAttributes<HTMLButtonElement>>} The alert button component
 */
export const AlertButton = forwardRef<HTMLButtonElement, AlertButtonProps>(
  ({ icon, label, isSelected, isLoading, onPress, className, ...props }, ref) => {
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
            'shadow-medium': !isSidebarOpen,
          },
          className
        )}
        onPress={onPress}
        ref={ref}
        {...props}
      >
        <div className="w-6 h-6 flex items-center justify-center relative">
          <NextImage
            unoptimized
            loading="eager"
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
