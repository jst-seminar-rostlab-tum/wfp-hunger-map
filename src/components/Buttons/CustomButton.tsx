'use client';

import { Button, ButtonProps } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface Props extends ButtonProps {
  children: React.ReactNode;
}

/**
 * Custom button component in the variants solid, bordered and flat. It can be used like a normal NextUI button
 * component.
 * @param variant solid | bordered | flat
 * @constructor
 */

export function CustomButton({ children, ...attributes }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [bgFlat, setBgFlat] = useState<string>('');
  const [colorFlat, setColorFlat] = useState<string>('');

  const { theme } = useTheme();
  const { variant } = attributes;

  useEffect(() => {
    setBgFlat(theme === 'light' ? '#EEEEEE' : '#424242');
    setColorFlat(theme === 'light' ? '#333333' : '#E0E0E0');
  }, [theme]);

  switch (variant as string) {
    case 'bordered':
      return (
        <Button
          {...attributes}
          style={isHovered ? { backgroundColor: theme === 'light' ? '#e3f2fd' : '#0F6396' } : {}}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Button>
      );
    case 'flat':
      return (
        <Button
          {...attributes}
          style={
            isHovered
              ? { color: '#E0E0E0', backgroundColor: '#0F6396' }
              : {
                  color: colorFlat,
                  backgroundColor: bgFlat,
                }
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Button>
      );
    case 'solid':
      return (
        <Button
          {...attributes}
          backgroundColor="green"
          style={
            isHovered
              ? { color: '#E0E0E0', backgroundColor: '#0F6396' }
              : {
                  color: '#E0E0E0',
                  backgroundColor: '#157DBC',
                }
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </Button>
      );
    default:
      return <Button {...attributes}>{children}</Button>;
  }
}
