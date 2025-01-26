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
      <div className="flex items-center justify-between gap-4 w-full max-w-full" aria-hidden="true">
        {!isIconOnly && <small className="pt-0.5">Theme</small>}
        <Skeleton aria-hidden="true" className="rounded-full w-12 h-7" />
      </div>
    );

  return (
    <Switch
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      classNames={{
        base: 'flex items-center gap-4 w-full max-w-full justify-between',
        wrapper: 'order-2 bg-yellow-200 group-data-[selected=true]:bg-primary',
        thumb: ['bg-yellow-400', 'group-data-[selected=true]:bg-black'],
        label: 'order-1 text-tiny ms-0',
      }}
      isSelected={theme === 'dark'}
      onChange={handleThemeChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleThemeChange();
        }
      }}
      thumbIcon={
        theme === 'dark' ? (
          <Moon size={16} variant="Bold" color="white" aria-hidden="true" />
        ) : (
          <Sun1 size={16} variant="Bold" color="white" aria-hidden="true" />
        )
      }
    >
      {!isIconOnly && 'Theme'}
    </Switch>
  );
}
