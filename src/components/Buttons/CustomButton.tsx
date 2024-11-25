import { Button } from '@nextui-org/button';
import clsx from 'clsx';

import { CustomButtonProps } from '@/domain/props/CustomButtonProps';

/**
 * Custom button component in the variants solid, bordered and flat. It can be used like a normal NextUI button
 * component.
 * @param variant solid | bordered | flat
 */

export function CustomButton({ children, ...attributes }: CustomButtonProps) {
  const { variant } = attributes;

  return (
    <Button
      {...attributes}
      className={clsx({
        'hover:bg-outlinedHover': variant === 'bordered',
        'hover:bg-hover dark:text-foreground': variant === 'flat' || variant === 'solid',
        'bg-clickableSecondary hover:text-background ': variant === 'flat',
        'bg-primary dark:hover:bg-hover text-background': variant === 'solid',
      })}
    >
      {children}
    </Button>
  );
}
