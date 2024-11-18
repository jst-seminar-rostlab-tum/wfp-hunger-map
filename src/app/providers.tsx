'use client';

import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types.d.ts';
import * as React from 'react';

import { SelectedAlertProvider } from '@/domain/contexts/SelectedAlertContext';
import { SelectedCountryProvider } from '@/domain/contexts/SelectedCountryContext';
import { SelectedMapProvider } from '@/domain/contexts/SelectedMapContext';
import { SidebarProvider } from '@/domain/contexts/SidebarContext';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider defaultTheme="system" {...themeProps}>
        <SidebarProvider>
          <SelectedMapProvider>
            <SelectedAlertProvider>
              <SelectedCountryProvider>{children}</SelectedCountryProvider>
            </SelectedAlertProvider>
          </SelectedMapProvider>
        </SidebarProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
