'use client';

import { useTheme } from 'next-themes';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { Chart } from '@/components/Charts/Chart';

/**
 * You can use this page to try and show off your components.
 * It's not accessible from the UI, but you can reach it by manually navigating to /elements
 */
export default function Elements() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Chart />
      <CustomButton variant="solid" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Change Theme
      </CustomButton>
      <CustomButton variant="bordered" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Change Theme
      </CustomButton>
      <CustomButton variant="flat" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Change Theme
      </CustomButton>
    </div>
  );
}
