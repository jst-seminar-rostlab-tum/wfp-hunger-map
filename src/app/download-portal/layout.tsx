import { Metadata } from 'next';

import HungerMapChatbot from '@/components/Chatbot/Chatbot';
import { Topbar } from '@/components/Topbar/Topbar';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: 'Download Portal',
    template: `%s - ${siteConfig.name}`,
  },
  description:
    'Access and download real-time global hunger data as PDF reports or JSON data. Obtain food insecurity statistics from the WFP Hunger Map Download Portal, tailored to different countries and time zones. A valuable resource for humanitarian efforts and research.',
  keywords: siteConfig.keywords,
  openGraph: {
    title: `Download Portal - ${siteConfig.name}`,
    description:
      'Download real-time global hunger data as PDF reports or JSON data from the WFP Hunger Map Download Portal, tailored to different countries and time zones. Essential for humanitarian aid and research.',
    url: `${siteConfig.domain}/download-portal`,
    images: [
      {
        url: '/Images/Download-preview.png',
        width: 1200,
        height: 630,
        alt: `Download Portal - ${siteConfig.name}`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Download Portal - ${siteConfig.name}`,
    description:
      'Access downloadable global hunger data from the WFP Hunger Map Download Portal, tailored to different countries and time zones.',
    images: [
      {
        url: '/Images/Download-preview.png',
        width: 1200,
        height: 630,
        alt: `Download Portal - ${siteConfig.name}`,
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
      <main className="flex flex-col gap-6 lg:gap-10 p-5 lg:p-10 text-content">{children}</main>
    </div>
  );
}
