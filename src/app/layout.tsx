import '@/styles/globals.css';

import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';

import { CookieConsentPopup } from '@/components/Analytics/CookieConsentPopup';
import { Snackbar } from '@/components/Snackbar/Snackbar';
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
  keywords: [
    'global hunger map',
    'WFP hunger data',
    'food insecurity trends',
    'humanitarian aid insights',
    'hunger statistics',
    'real-time hunger data',
    'WFP hunger map',
  ], // may not be used by search engines but its good to have
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: 'WFP Hunger Map',
    images: [
      {
        url: '/Images/Web-preview.png',
        width: 1200,
        height: 630,
        alt: 'Global Hunger Map Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: '/Images/Web-preview.png',
        width: 1200,
        height: 630,
        alt: 'Global Hunger Map Preview',
      },
    ],
    site: '@WFP',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
      <head>
        {/* JSON-LD Structured Data */}
        <Script type="application/ld+json" id="structured-data">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Global Hunger Map",
              "description": "Explore the Global Hunger Map by WFP for real-time insights on global hunger trends and food insecurity data.",
              "url": "https://www.wfp-hungermap.com",
              "publisher": {
                "@type": "Organization",
                "name": "World Food Programme",
                "logo": {
                  "@type": "ImageObject",
                  "url": "/favicon/favicon.svg"
                }
              }
            }
          `}
        </Script>

        {/* Google Analytics Script */}
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
              });
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
            `}
        </Script>
        <link rel="preload" href="/wfp_logo.svg" as="image" />
      </head>
      <body className={clsx('min-h-dvh bg-background font-sans antialiased', fontSans.variable)}>
        <CookieConsentPopup />
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative h-dvh">
            <Snackbar />
            <main className="h-full w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
