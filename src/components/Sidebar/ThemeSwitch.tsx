'use client';

import { Skeleton } from '@nextui-org/skeleton';
import { Switch } from '@nextui-org/switch';
import { Moon, Sun1 } from 'iconsax-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { ThemeSwitchProps } from '@/domain/props/ThemeSwitchProps';

/**
 * Theme switcher component that toggles between light and dark modes.
 * Supports both icon-only and labeled variants.
 *
 * @component
 * @param {ThemeSwitchProps} props - Component properties
 * @param {boolean} [props.isIconOnly=false] - When true, hides the "Theme" label
 *
 * @accessibility
 * - Provides aria-label for the switch
 * - Shows loading skeleton during SSR/hydration
 *
 * @returns {React.JSX.Element} Theme switch component with optional label
 */
export function ThemeSwitch({ isIconOnly = false }: ThemeSwitchProps): React.JSX.Element {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="flex items-center justify-between gap-4 w-full ml-1">
        {!isIconOnly && <small>Theme</small>}
        <Skeleton aria-hidden="true" className="rounded-full  w-14 h-7" />
      </div>
    );

  return (
    <div className="flex items-center justify-between gap-4 w-full ml-1">
      {!isIconOnly && <small>Theme</small>}
      <Switch
        aria-label="theme-switch"
        classNames={{
          wrapper: ['bg-yellow-200', 'group-data-[selected=true]:bg-primary'],
          thumb: ['bg-yellow-400', 'group-data-[selected=true]:bg-black'],
        }}
        isSelected={theme === 'dark'}
        onChange={handleThemeChange}
        thumbIcon={
          theme === 'dark' ? (
            <Moon size={16} variant="Bold" color="white" />
          ) : (
            <Sun1 size={16} variant="Bold" color="white" />
          )
        }
      />
    </div>
  );
}
