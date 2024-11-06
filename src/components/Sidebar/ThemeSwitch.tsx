'use client';

import { Switch } from '@nextui-org/switch';
import { Moon, Sun1 } from 'iconsax-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">Light mode</span>
      <Switch
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
      <span className="text-sm">Dark mode</span>
    </div>
  );
}
