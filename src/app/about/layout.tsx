import { Metadata } from 'next';

import { Topbar } from '@/components/Topbar/Topbar';

export const metadata: Metadata = {
  title: 'About',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Topbar />
      <main className="flex flex-col gap-6 lg:gap-10 p-5 lg:p-10 text-content !pt-1">{children}</main>
    </div>
  );
}
