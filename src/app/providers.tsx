'use client';

import { NextUIProvider } from '@nextui-org/system';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';

import { cachedQueryClient } from '@/config/queryClient';
import { AccordionsModalProvider } from '@/domain/contexts/AccodionsModalContext';
import { ChatbotProvider } from '@/domain/contexts/ChatbotContext';
import { SelectedAlertProvider } from '@/domain/contexts/SelectedAlertContext';
import { SelectedCountryIdProvider } from '@/domain/contexts/SelectedCountryIdContext';
import { SelectedMapProvider } from '@/domain/contexts/SelectedMapContext';
import { SidebarProvider } from '@/domain/contexts/SidebarContext';
import { SnackbarProvider } from '@/domain/contexts/SnackbarContext';

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
            <SelectedMapProvider>
              <SelectedAlertProvider>
                <SelectedCountryIdProvider>
                  <AccordionsModalProvider>
                    <SnackbarProvider>
                      <ChatbotProvider>{children}</ChatbotProvider>
                    </SnackbarProvider>
                  </AccordionsModalProvider>
                </SelectedCountryIdProvider>
              </SelectedAlertProvider>
            </SelectedMapProvider>
          </SidebarProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
