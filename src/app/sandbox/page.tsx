'use client';

import { Switch } from '@nextui-org/switch';
import { useTheme } from 'next-themes';

/**
 * For testing purposes only -> todo: to be deleted after PR
 */
export default function Sandbox() {
  const { theme, setTheme } = useTheme();

  const lineChartTestBox = (
    <div className="w-full h-fit flex flex-row flex-wrap gap-10 justify-around px-8 pt-40 pb-16 border-b border-gray-800">
      chart examples
    </div>
  );

  return (
    <>
      <div className="w-full h-10 p-8 flex flex-row items-center gap-4 border-b border-gray-800">
        <p> Change dark/light mode: </p>
        <Switch onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme" size="sm" />
      </div>
      {lineChartTestBox}
    </>
  );
}
