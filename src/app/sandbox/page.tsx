'use client';

import { Switch } from '@nextui-org/switch';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Sandbox() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="w-full h-10 p-4 flex flex-row items-center gap-4 border-b border-gray-800">
        <p> Change dark/light mode: </p>
        <Switch
          onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
          size="sm"
        />
      </div>
      <div className="w-full h-fit min-h-60 p-4 border-b border-gray-800">
        Sandbox 1
      </div>
      <div className="w-full h-fit min-h-60 p-4 border-b border-gray-800">
        Sandbox 2
      </div>
    </>
  );
}
