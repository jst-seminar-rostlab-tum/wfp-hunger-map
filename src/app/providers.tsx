'use client';

import { NextUIProvider } from '@nextui-org/system';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types.d.ts';
import * as React from 'react';

import { cachedQueryClient } from '@/config/queryClient';
import { SelectedAlertProvider } from '@/domain/contexts/SelectedAlertContext';
import { SelectedCountryIdProvider } from '@/domain/contexts/SelectedCountryIdContext'; // Import the provider
import { SelectedMapProvider } from '@/domain/contexts/SelectedMapContext';
import { SelectedMapVisibilityProvider } from '@/domain/contexts/SelectedMapVisibilityContext';
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
        <QueryClientProvider client={cachedQueryClient}>
          <SidebarProvider>
            <SelectedMapVisibilityProvider>
              <SelectedMapProvider>
                <SelectedAlertProvider>
                  <SelectedCountryIdProvider>{children}</SelectedCountryIdProvider>
                </SelectedAlertProvider>
              </SelectedMapProvider>
            </SelectedMapVisibilityProvider>
          </SidebarProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
