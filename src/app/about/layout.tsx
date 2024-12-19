import { Metadata } from 'next';

import HungerMapChatbot from '@/components/Chatbot/Chatbot';
import { Topbar } from '@/components/Topbar/Topbar';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: 'About',
    template: `%s - ${siteConfig.name}`,
  },
  description:
    'Learn more about the WFP Hunger Map, its mission, and how it provides real-time global hunger data and food insecurity trends.',
  keywords: siteConfig.keywords,
  openGraph: {
    title: `About Us - ${siteConfig.name}`,
    description:
      'Discover the mission and purpose behind the WFP Hunger Map, providing real-time global hunger data and insights.',
    url: `${siteConfig.domain}/about`,
    images: [
      {
        url: '/Images/About-preview.png',
        width: 1200,
        height: 630,
        alt: `About Us - ${siteConfig.name}`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `About Us - ${siteConfig.name}`,
    description:
      'Learn more about how the WFP Hunger Map helps visualize real-time global hunger and food insecurity trends.',
    images: [
      {
        url: '/Images/About-preview.png',
        width: 1200,
        height: 630,
        alt: `About Us - ${siteConfig.name}`,
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
