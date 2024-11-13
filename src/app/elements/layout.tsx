import { Metadata } from 'next';

import { Topbar } from '@/components/Topbar/Topbar';

export const metadata: Metadata = {
  title: 'Elements',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
}
