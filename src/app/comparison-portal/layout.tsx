import { Metadata } from 'next';

import HungerMapChatbot from '@/components/Chatbot/Chatbot';
import { Topbar } from '@/components/Topbar/Topbar';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: 'Comparison Portal',
    template: `%s - ${siteConfig.name}`,
  },
  description:
    'Compare real-time global hunger data across different countries and regions. Obtain food insecurity statistics from the WFP Hunger Map Comparison Portal, tailored to various time zones. A valuable resource for humanitarian efforts and research.',
  keywords: siteConfig.keywords,
  openGraph: {
    title: `Comparison Portal - ${siteConfig.name}`,
    description:
      'Compare real-time global hunger data across different countries and regions. Obtain food insecurity statistics from the WFP Hunger Map Comparison Portal, tailored to various time zones. Essential for humanitarian aid and research.',
    url: `${siteConfig.domain}/comparison-portal`,
    images: [
      {
        url: '/Images/Comparison-preview.png',
        width: 1200,
        height: 630,
        alt: `Comparison Portal - ${siteConfig.name}`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Comparison Portal - ${siteConfig.name}`,
    description:
      'Access comparable global hunger data from the WFP Hunger Map Comparison Portal, tailored to different countries and time zones.',
    images: [
      {
        url: '/Images/Comparison-preview.png',
        width: 1200,
        height: 630,
        alt: `Comparison Portal - ${siteConfig.name}`,
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
    <div className="min-h-screen flex flex-col">
      <div className="mb-20">
        <Topbar />
        <HungerMapChatbot />
      </div>
      <main className="flex flex-col gap-6 lg:gap-10 p-5 lg:p-10 text-content w-full">{children}</main>
    </div>
  );
}
