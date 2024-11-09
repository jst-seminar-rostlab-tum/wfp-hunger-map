import '@/styles/globals.css';

import clsx from 'clsx';
import { Metadata, Viewport } from 'next';

import HungerAlert from '@/components/HungerAlert/HungerAlert';
import { AlertsMenuWrapper } from '@/components/AlertsMenu/AlertsMenuWrapper';
import Chatbot from '@/components/Chatbot/Chatbot';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative h-screen">
            <Chatbot />
            <Sidebar />
            <AlertsMenuWrapper />
            <main className="h-full w-full">{children}</main>
            <HungerAlert />
          </div>
        </Providers>
      </body>
    </html>
  );
}
