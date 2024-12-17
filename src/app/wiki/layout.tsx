import { Metadata } from 'next';

import { Topbar } from '@/components/Topbar/Topbar';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: 'Wiki',
    template: `%s - ${siteConfig.name}`,
  },
  description:
    'Discover more detailed explanations for some of the conceptsand insights on global hunger trends and data with the WFP Hunger Map Wiki. A resource hub for understanding food insecurity.',
  keywords: siteConfig.keywords,
  openGraph: {
    title: `Wiki - ${siteConfig.name}`,
    description:
      'Access comprehensive information and insights about global hunger and food insecurity trends in the WFP Hunger Map Wiki.',
    url: `${siteConfig.domain}/wiki`,
    images: [
      {
        url: '/Images/Wiki-preview.png',
        width: 1200,
        height: 630,
        alt: `Wiki - ${siteConfig.name}`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Wiki - ${siteConfig.name}`,
    description:
      'Access detailed resources and insights about global hunger trends and food insecurity data in the WFP Hunger Map Wiki.',
    images: [
      {
        url: '/Images/Wiki-preview.png',
        width: 1200,
        height: 630,
        alt: `Wiki - ${siteConfig.name}`,
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
      <Topbar />
      <main className="flex flex-col gap-6 lg:gap-10 p-5 lg:p-10 text-content !pt-1">{children}</main>
    </div>
  );
}
