import '@/styles/globals.css';

import clsx from 'clsx';
import { Metadata, Viewport } from 'next';

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
    icon: [
      { url: '/favicon/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/favicon/site.webmanifest',
  appleWebApp: {
    title: 'HungerMap',
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
            <main className="h-full w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
