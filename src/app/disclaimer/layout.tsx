import { Metadata } from 'next';

import HungerMapChatbot from '@/components/Chatbot/Chatbot';
import { Topbar } from '@/components/Topbar/Topbar';

export const metadata: Metadata = {
  title: 'Disclaimer',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-20">
        <Topbar />
        <HungerMapChatbot />
      </div>
      <div className="flex flex-col gap-6 lg:gap-10 p-5 lg:p-10 text-content">{children}</div>
    </div>
  );
}
