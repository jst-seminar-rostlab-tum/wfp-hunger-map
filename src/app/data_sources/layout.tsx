import { Metadata } from 'next';

import HungerMapChatbot from '@/components/Chatbot/Chatbot';
import { Topbar } from '@/components/Topbar/Topbar';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: 'Data Sources',
    template: `%s - ${siteConfig.name}`,
  },
  description:
    'Explore the data sources behind the WFP Hunger Map, providing insights into global hunger trends and food insecurity statistics.',
  keywords: siteConfig.keywords,
  openGraph: {
    title: `Data Sources - ${siteConfig.name}`,
    description:
      'Explore the trusted data sources behind the WFP Hunger Map, offering real-time global hunger trends and food insecurity insights.',
    url: `${siteConfig.domain}/data_sources`,
    images: [
      {
        url: '/Images/Datasource-preview.png',
        width: 1200,
        height: 630,
        alt: `Data Sources - ${siteConfig.name}`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Data Sources - ${siteConfig.name}`,
    description:
      'Explore the trusted data sources that power the WFP Hunger Map for real-time hunger and food insecurity statistics.',
    images: [
      {
        url: '/Images/Datasource-preview.png',
        width: 1200,
        height: 630,
        alt: `Data Sources - ${siteConfig.name}`,
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-20">
        <Topbar />
        <HungerMapChatbot />
      </div>
      <main className="flex flex-col gap-6 lg:gap-10 p-5 lg:p-10 text-content !pt-1">{children}</main>
    </div>
  );
}
